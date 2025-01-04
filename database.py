import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Database connection parameters
db_config = {
    'dbname': 'job_crawler',
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',  # or the IP of your PostgreSQL server
    'port': '5432',       # Default PostgreSQL port
}


schema_sql = """
   CREATE TABLE IF NOT EXISTS links (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL UNIQUE,
      mark INTEGER DEFAULT 0,
      qualified BOOLEAN DEFAULT FALSE,
      devops BOOLEAN DEFAULT FALSE,
      dev BOOLEAN DEFAULT FALSE,
      tech BOOLEAN DEFAULT FALSE,
      note TEXT,
      improvements TEXT,
      visited BOOLEAN DEFAULT FALSE,
      checked BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
"""


def connect_db():
   connection = None
   try:
       # Connect to PostgreSQL
       connection = psycopg2.connect(**db_config)
       cursor = connection.cursor()
       
       # Test query
       cursor.execute("SELECT version();")
       cursor.fetchone()
       
       return connection
       
   except (Exception, psycopg2.Error) as error:
       print("Error while connecting to PostgreSQL:", error)
       
           
           
def close_connection(connection):
    """
    Close the PostgreSQL connection.

    Args:
        connection: psycopg2 connection object.
    """
    if connection:
        connection.close()
        print("PostgreSQL connection is closed.")
        



def create_database_if_not_exists():
   """
   Ensure the PostgreSQL database exists, creating it if necessary.
   """
   try:
      connection = psycopg2.connect(
            dbname='postgres',
            user=db_config['user'],
            password=db_config['password'],
            host=db_config['host'],
            port=db_config['port']
      )
      connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
      cursor = connection.cursor()
      dbname = db_config['dbname']
     
     # Check if the database exists
      cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = %s", (dbname,))
      exists = cursor.fetchone()
      if not exists:
         # Create the database if it doesn't exist
         cursor.execute(f"CREATE DATABASE {dbname}")
         print(f"Database '{dbname}' created successfully.")
      else:
         print(f"Database '{dbname}' already exists.")

      cursor.close()
     
      create_tables(connection, schema_sql)
      close_connection(connection)
      
   except psycopg2.Error as error:
      print("Error while checking/creating the database:", error)

def create_tables(connection, schema_sql):
    """
    Create tables in the PostgreSQL database using a schema definition.
    """
    try:
        cursor = connection.cursor()
        cursor.execute(schema_sql)
        connection.commit()
        print("Tables created successfully.")
        cursor.close()
    except psycopg2.Error as error:
        print("Error while creating tables:", error)
        

def execute_prepared_query(connection, query, params=None):
    """
    Execute a prepared SQL query on the connected PostgreSQL database.

    Args:
        connection: psycopg2 connection object.
        query (str): SQL query to execute with placeholders.
        params (tuple): Parameters to pass into the query (if any). Default is None.

    Returns:
        list: Query results as a list of tuples, or None if an error occurred.
    """
    try:
        with connection.cursor() as cursor:
            formatted_query = cursor.mogrify(query, params)
            print("Executing SQL Query:", formatted_query.decode('utf-8'))
            cursor.execute(query, params)
            if cursor.description:  # Check if the query returns data
                results = cursor.fetchall()
                return results
            connection.commit()  # Commit the transaction for INSERT/UPDATE/DELETE
    except psycopg2.Error as error:
        print("Error executing query:", error)
        return None