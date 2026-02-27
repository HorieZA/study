import mariadb
from dotenv import load_dotenv
load_dotenv()
import os

# DB 연결 분리
def getConn():
  try:
    return mariadb.connect(
      user=os.getenv("USER"),
      password=os.getenv("PASSWORD"),
      host=os.getenv("HOST"),
      port=int(os.getenv("PORT")),
      database=os.getenv("DATABASE")
      )
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
    return None

# 하나의 값만 출력할때 사용
def findOne(sql):
  result = None
  try:
    conn = getConn()
    if conn:
      cur = conn.cursor()
      cur.execute(sql)
      row = cur.fetchone()
      columns = [desc[0] for desc in cur.description]
      cur.close()
      conn.close()
      result = dict(zip(columns, row)) if row else None
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
  return result

# 전체를 출력할때 사용
def findAll(sql):
  # print(sql)
  result = []
  try:
    conn = getConn()
    if conn:
      cur = conn.cursor()
      cur.execute(sql)
      rows = cur.fetchall()
      columns = [desc[0] for desc in cur.description]
      cur.close()
      conn.close()
      result = [dict(zip(columns, row)) for row in rows]
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
  return result

def findSave(sql):
  result = False
  try:
    conn = getConn()
    if conn:
      cur = conn.cursor()
      cur.execute(sql)
      conn.commit()
      cur.close()
      conn.close()
      result = True
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
  return result