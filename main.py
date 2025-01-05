import queue
import sys
import threading
import time

from seleniumbase import SB

from database import (close_connection, connect_db,
                      create_database_if_not_exists, create_tables, schema_sql)
from helpers import (get_clipboard_text, html_to_formatted_text, parse_json,
                     remove_markers)
from prompts import make_prompt
from queries import (add_link, check_link_exists, get_latest_resume,
                     get_next_unvisited_link, update_link)

sys.argv.append("-n")  # Tell SeleniumBase to do thread-locking as needed
semaphore = threading.Semaphore(1)

def explorer(event, questions_queue, answers_queue, db_connection):
    print("explorer thread started")
    # Visits the links and get the job score
    with SB(uc=True, ad_block=True) as sb:
        while True:
            url = get_next_unvisited_link(db_connection)
            print("Visiting link:", url)
            if not url:
                print("No more unvisited links")
                event.set() # signal the end of the thread
                break
            
            job_title = ""
            job_description = ""
            with semaphore:
                sb.activate_cdp_mode(url)

                # Hide the cookie banner
                cookie_banner_selector = "/html/body/div/div/div[1]/div/div/div/div/div[2]/button"
                cookie_banner_element = sb.cdp.find_element(cookie_banner_selector)
                cookie_banner_element.click()
                sb.sleep(1)

                # check if the page is removed
                page_removed_indicator_text = "Cette offre d'emploi n’est plus disponible."
                sb.cdp.find_elements_by_text(page_removed_indicator_text)
                 
                # job title
                job_title = sb.cdp.get_title()
                try:
                    job_description_container_selector = "/html/body/main/div[3]/div[3]/div[1]/div[2]/div"
                    job_description_container = sb.cdp.find_element(job_description_container_selector)
                    for element in job_description_container.query_selector_all("& > *"):
                        job_description += element.get_html()
                        job_description += "\n"
                    
                    job_description = html_to_formatted_text(job_description)
                    
                    
                except Exception as error:
                    try:
                        print("Error in getting job description:", error)
                        page_removed_indicator_text = "Cette offre d'emploi n’est plus disponible."
                        sb.cdp.find_elements_by_text(page_removed_indicator_text)
                        print("Job removed")
                        update_link(db_connection, url=url, visited=True)
                        continue
                    except Exception as error:
                        print("Error in getting job description:", error)
                        event.set() # signal the end of the thread
                        raise error
                    
            questions_queue.put((job_title, job_description))
            while not event.is_set() or not answers_queue.empty():
                try:
                    chatgpt_answer_values = answers_queue.get(timeout=1)
                    print("ChatGPT answer values:", chatgpt_answer_values)
                    update_link(db_connection, url=url, visited=True, job_title=job_title, mark=chatgpt_answer_values["score"],
                                qualified=chatgpt_answer_values["value"], devops=chatgpt_answer_values["is_devops"],
                                dev=chatgpt_answer_values["is_dev"], tech=chatgpt_answer_values["is_tech"], 
                                note=chatgpt_answer_values["explanation"], improvements=chatgpt_answer_values["fixes"], 
                                cover_letter=chatgpt_answer_values["cover_letter"])
                    break # break the loop and go to the next link
                
                except queue.Empty:
                    continue
        
def chatgpt(event, questions_queue, answers_queue, latest_resume):
    print("chatgpt thread started")
    # Check if the job is interesting
    chatgpt_url = "https://chatgpt.com/"
    with SB(uc=True) as sb:
        sb.maximize_window()
        with semaphore:
            sb.activate_cdp_mode(chatgpt_url)
        
        while not event.is_set() or not questions_queue.empty():
            try:
                question = questions_queue.get(timeout=1)
                (job_title, job_description) = question

                try:
                    with semaphore:
                        # Hide the login modal if it appears                        
                        hide_login_modal_selector = "/html/body/div[4]/div/div/div/div/div/a"
                        if sb.cdp.is_element_present(hide_login_modal_selector):
                            hide_login_modal = sb.cdp.find_element(hide_login_modal_selector)
                            hide_login_modal.click()
                            sb.sleep(0.5)
                        
                        # chatgpt input section 
                        chatgpt_input_selector = "#prompt-textarea"
                        chatgpt_input = sb.cdp.find_element(chatgpt_input_selector)
                        prompt = make_prompt(latest_resume, job_title, job_description)
                        chatgpt_input.send_keys(prompt)

                        sb.sleep(1)
                        
                        # chatgpt form
                        chatgpt_form_selector = "form"
                        chatgpt_form = sb.cdp.find_element(chatgpt_form_selector)
                        
                        # chatgpt submit button
                        chatgpt_submit_button = chatgpt_form.query_selector_all("button")[-1]
                        chatgpt_submit_button.click()
                        
                        # wait for the answer
                        sb.sleep(10)
                        
                        # discussion container
                        chatgpt_discussion_container_selector = "/html/body/div[1]/div[1]/main/div[1]/div[1]/div/div/div/div"
                        chatgpt_discussion_container = sb.cdp.find_element(chatgpt_discussion_container_selector, timeout=60)
                        
                        # last article in discussion
                        chatgpt_last_article = chatgpt_discussion_container.query_selector_all("article")[-1]
                        
                        # pre element in last article
                        chatgpt_last_article_pre = chatgpt_last_article.query_selector("pre")
                        
                        # json code element in pre element
                        chatgpt_last_article_json = chatgpt_last_article_pre.query_selector("& > div > div:last-child")
                        
                        # get text of json code element
                        chatgpt_answer = chatgpt_last_article_json.get_html()
                        chatgpt_answer = html_to_formatted_text(chatgpt_answer)
                        chatgpt_answer = remove_markers(chatgpt_answer, ["```json", "```"])
                        chatgpt_answer_values = parse_json(chatgpt_answer)
                        
                        answers_queue.put(chatgpt_answer_values)
                    
                except Exception as error:
                    print("Error in ChatGPT:", error)
                    event.set() # signal the end of the thread
                    raise error
                
            except queue.Empty:
                continue
                
def main():
    pasted_text = get_clipboard_text()
    print("Pasted text:", pasted_text)
    
    # Database connection
    create_database_if_not_exists()
    db_connection = connect_db()
    create_tables(db_connection, schema_sql)
    latest_resume = get_latest_resume(db_connection)
    if latest_resume is None:
        raise "Please add a resume to the database"

    try:
        page = 1
        already_added_count = 0
        with SB(uc=True) as sb:
            while True:
                url = "https://www.hellowork.com/fr-fr/emploi/recherche.html?k=D%C3%A9veloppeur&k_autocomplete=http%3A%2F%2Fwww.rj.com%2FCommun%2FPost%2FDeveloppeur&l=%C3%8Ele-de-France&l_autocomplete=http%3A%2F%2Fwww.rj.com%2Fcommun%2Flocalite%2Fregion%2F11&st=relevance&c=Stage&cod=all&ray=50&d=w&p=" + str(page)
                sb.activate_cdp_mode(url)
                
                # Hide the cookie banner
                cookie_banner_selector = "/html/body/div/div/div[1]/div/div/div/div/div[2]/button"
                cookie_banner_element = sb.cdp.find_element(cookie_banner_selector)
                cookie_banner_element.click()
                sb.sleep(1)

                # Get Job list elements
                job_list_container_selector = "/html/body/main/turbo-frame[3]/section[2]/div[1]/section[3]/ul"
                job_list_container = sb.cdp.find_element(job_list_container_selector)
                elements = job_list_container.querySelectorAll("li")
                if len(elements) == 0:
                    print("No job found")
                    break

                for element in elements:
                    href = element.query_selector("a").get_attribute("href")
                    if not check_link_exists(db_connection, href):
                        print(href)
                        add_link(db_connection, href)
                        already_added_count = 0
                    else:
                        already_added_count += 1
                    
                sb.sleep(3)
                page += 1
                if already_added_count > 5:
                    print("Threshold reached of already added links, which means the rest of the links are already added")
                    break
            
            print("next step, visit the links")
            
        time.sleep(5)
        # Create the threads
        questions_queue = queue.Queue()  # Thread-safe queue
        answers_queue = queue.Queue()  # Thread-safe queue
        stop_event = threading.Event()  # Event to signal stop
        
        # Create the threads
        thread_explorer = threading.Thread(target=explorer, args=(stop_event, questions_queue, answers_queue, db_connection))
        thread_chatgpt = threading.Thread(target=chatgpt, args=(stop_event, questions_queue, answers_queue, latest_resume))
        
        # Start the threads
        thread_chatgpt.start()
        time.sleep(5)
        thread_explorer.start()
        
        # Wait for the threads to finish
        thread_chatgpt.join()
        thread_explorer.join()   

    
    finally:
        close_connection(db_connection)
    
    
if __name__ == "__main__":
    # count = 0
    main()
    # while True:
    #     start = time.time()
    #     try:
    #     except Exception as error:
    #         if time.time() - start < 120:
    #             count += 1
    #         else:
    #             count = 1
    #         print("Error in execution:", error)
    #         continue
    #     finally:
    #         time.sleep(30)
    #         if count > 10:
    #             print("Max retries reached")
    #             break