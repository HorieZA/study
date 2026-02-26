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
def finOne(sql):
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
def finAll(sql):
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

def finSave(sql):
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

deftNo1 = "d001"
deftNo2 = "d002"
deftNo3 = "d009"
arr = [deftNo1, deftNo2, deftNo3]
# deftNos = (deftNo1, deftNo2, deftNo3)
# sql = f"""
#     SELECT dept_no, COUNT(emp_no) AS 수
#       FROM edu.dept_emp
#      WHERE dept_no IN{tuple(arr)}
#      GROUP BY dept_no
#      ORDER BY 2 DESC;
#     """
sql1 = f"""
    SELECT * FROM edu.test;
    """
# print(sql)
# print(finOne(sql))
print(finAll(sql1))

name = "둘리/남"
sql2 = f"""
    INSERT INTO edu.test (`name`, `regDate`) VALUE ('{name}', NOW());
    """
print(finSave(sql2))
print(finAll(sql1))

sql3 = f"""
    SELECT * FROM edu.test;
    """