import sys
from concurrent.futures import ThreadPoolExecutor

from seleniumbase import Driver

sys.argv.append("-n")  # Tell SeleniumBase to do thread-locking as needed

def launch_driver(url):
    driver = Driver(uc=True)
    try:
        driver.get(url=url)
        driver.sleep(200)
    finally:
        driver.quit()

urls = ['https://seleniumbase.io/demo_page', "https://google.com", "https://amazon.com"]
with ThreadPoolExecutor(max_workers=len(urls)) as executor:
    for url in urls:
        executor.submit(launch_driver, url)