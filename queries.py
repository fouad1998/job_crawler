from database import execute_prepared_query


def check_link_exists(connection, url):
   check_link_query = "SELECT EXISTS(SELECT 1 FROM links WHERE url = %s)"
   result = execute_prepared_query(connection, check_link_query, (url,))
   if result:
      return result[0][0]
   
   return False

def add_link(connection, url):
   add_link_query = "INSERT INTO links (url) VALUES (%s)"
   try:
      execute_prepared_query(connection, add_link_query, (url,))
   except Exception as error:
      if "duplicate key value violates unique constraint" in str(error):
         print("Link already exists in database")
      
      raise error
   
def update_link(connection, url, job_title=None, mark=None, visited=None, checked=None, note=None,
                improvements=None, qualified=None, devops=None, dev=None, tech=None,
                cover_letter=None):
   update_link_query = """
   UPDATE links SET title = COALESCE(%s, title), mark = COALESCE(%s, mark), visited = COALESCE(%s, visited),
   checked = COALESCE(%s, checked), note = COALESCE(%s, note), improvements = COALESCE(%s, improvements),
   qualified = COALESCE(%s, qualified), devops = COALESCE(%s, devops), dev = COALESCE(%s, dev), tech = COALESCE(%s, tech),
   cover_letter = COALESCE(%s, cover_letter)
   WHERE url = %s
   """
   execute_prepared_query(connection, update_link_query, (job_title, mark, visited, checked, note,
                                                          improvements, qualified, devops, dev, tech,
                                                          cover_letter, url))
   
def get_next_unvisited_link(connection):
   get_next_unvisited_link_query = "SELECT url FROM links WHERE visited = FALSE ORDER BY created_at desc LIMIT 1"
   result = execute_prepared_query(connection, get_next_unvisited_link_query)
   if result:
      return result[0][0]
   

def get_latest_resume(connection):
   get_latest_resume_query = "SELECT content FROM resume ORDER BY created_at DESC LIMIT 1"
   result = execute_prepared_query(connection, get_latest_resume_query)
   if result:
      return result[0][0]
   
   return None