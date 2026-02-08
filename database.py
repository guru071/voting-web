import sqlite3;
connnection=sqlite3.connect("votes.db")
cursor=connnection.cursor()
sql_query = """
CREATE TABLE IF NOT EXISTS vote (
voter_name TEXT NOT NULL,
voter_id TEXT NOT NULL UNIQUE,
contact_no INTEGER NOT NULL,
aadhar_no INTEGER NOT NULL,
birth_date DATE NOT NULL,
age INTEGER NOT NULL,
vote_count INTEGER NOT NULL,
active_state BOOLEAN NOT NULL DEFAULT 1,
);
"""
cursor.execute(sql_query)
def insert(name,id,contact,aadhar,birth_date,age,active_state)->None:
    sql_query = f"""
    INSERT INTO vote ({name},{id},{contact},{aadhar},{birth_date},{age},{active_state});
    """
    cursor.execute(sql_query)
sql_query = """
CREATE TABLE IF NOT EXISTS tn_cm_vote (
name TEXT NOT NULL,
total_vote_cnt INTEGER NOT NULL,

);
"""
cursor.execute(sql_query)