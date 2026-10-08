import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def init_techboss_db():
    conn = psycopg2.connect("postgresql://postgres@127.0.0.1:5432/postgres")
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM pg_database WHERE datname='techboss'")
    if not cur.fetchone():
        cur.execute("CREATE DATABASE techboss")
        print("Created database 'techboss'")
    else:
        print("Database 'techboss' already exists.")
    cur.close()
    conn.close()

if __name__ == "__main__":
    init_techboss_db()
