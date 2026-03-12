from db import findOne, save, saveEtl
from settings import settings
import mariadb
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

# DB 공통
conn_params = {
  "user" : settings.mariadb_user,
  "password" : settings.mariadb_password,
  "host" : settings.mariadb_host,
  # "database" : settings.mariadb_database,
  "port" : settings.mariadb_port
}

app = FastAPI()

# ETL 항공사 db.py 사용 안함
def etl(year:int, month: int):
  print("db_air 에서 db_to_air 데이터 이관 작업")
  try:
    conn = mariadb.connect(**conn_params)
    if conn:
      where = f"where 년도 = {year} and 월 = {month}"
      sql1 = f"delete from db_to_air.`비행` {where}"
      sql2 = f"insert into db_to_air.`비행` select * from db_air.`비행` {where}"
      sql3 = f"select count(*) as cnt from db_to_air.`비행` {where}"
      print("SQL 실행")
      cur = conn.cursor()
      cur.execute(sql1)
      cur.execute(sql2)
      conn.commit()
      cur.execute(sql3)
      row = cur.fetchone()
      print(f"적재 : {row[0]} 건")
      cur.close()
      conn.close()
  except mariadb.Error as e:
    print(f"접속 오류 : {e}")

# ETL 항공사 테이블명 추가 버전 db.py 사용 안함
def etl2(table: str, year:int = 0, month: int = 0):
  print("db_air 에서 db_to_air 데이터 이관 작업")
  try:
    conn = mariadb.connect(**conn_params)
    if conn:
      where = ""
      if year > 0 and month > 0:
        where = f"where 년도 = {year} and 월 = {month}"
      sql1 = f"delete from db_to_air.`{table}` {where}"
      sql2 = f"insert into db_to_air.`{table}` select * from db_air.`{table}` {where}"
      sql3 = f"select count(*) as cnt from db_to_air.`{table}` {where}"
      print("SQL 실행")
      cur = conn.cursor()
      cur.execute(sql1)
      cur.execute(sql2)
      conn.commit()
      cur.execute(sql3)
      row = cur.fetchone()
      print(f"{table} 적재 : {row[0]} 건")
      cur.close()
      conn.close()
  except mariadb.Error as e:
    print(f"접속 오류 : {e}")

# jobs 관리 및 log 처리 1
def etl3(data: dict):
  print("db_air 에서 db_to_air 데이터 이관 작업")
  try:
    conn = mariadb.connect(**conn_params)
    if conn:
      no = data["no"]
      year = data["year"]
      month = data["month"]
      table = data["table"]
      where = ""
      if year > 0 and month > 0:
        where = f"where 년도 = {year} and 월 = {month}"
      sql1 = f"delete from db_to_air.`{table}` {where}"
      sql2 = f"insert into db_to_air.`{table}` select * from db_air.`{table}` {where}"
      sql3 = f"select count(*) as cnt from db_to_air.`{table}` {where}"
      print("SQL 실행")
      cur = conn.cursor()
      cur.execute(sql1)
      cur.execute(sql2)
      conn.commit()
      cur.execute(sql3)
      row = cur.fetchone()
      print(f"{table} 적재 : {row[0]} 건")
      sql4 = f"update db_to_air.jobs set `cnt` = {row[0]}, `modDate` = now() where `no` = {no}"
      cur.execute(sql4)
      conn.commit()
      cur.close()
      conn.close()
  except mariadb.Error as e:
    print(f"접속 오류 : {e}")

# jobs 관리 및 log 처리 2
def jobs(useYn: int):
  try:
    conn = mariadb.connect(**conn_params)
    if conn:
      sql = f"select `no`, `table`, `year`, `month` from db_to_air.jobs where useYn in ({useYn})"
      cur = conn.cursor()
      cur.execute(sql)
      rows = cur.fetchall()
      columns = [desc[0] for desc in cur.description]
      cur.close()
      conn.close()
      result = [dict(zip(columns, row)) for row in rows]
      return result
  except mariadb.Error as e:
    print(f"접속 오류 : {e}")
  return []

# int => tuple 조건 수정
def jobs(useYn: tuple):
  try:
    conn = mariadb.connect(**conn_params)
    if conn:
      # 조건 수정 추가 부분
      if isinstance(useYn, (list, tuple)):
        keys = ",".join(map(str, useYn))
      else:
        keys = useYn
      
      sql = f"select `no`, `table`, `year`, `month` from db_to_air.jobs where useYn in ({keys})"
      cur = conn.cursor()
      cur.execute(sql)
      rows = cur.fetchall()
      columns = [desc[0] for desc in cur.description]
      cur.close()
      conn.close()
      result = [dict(zip(columns, row)) for row in rows]
      return result
  except mariadb.Error as e:
    print(f"접속 오류 : {e}")
  return []

# ETL 항공사 db.py 사용
def main():
  print("db_air 에서 db_to_air 데이터 이관 작업")
  try:
    sql = """
      INSERT 
        INTO db_to_air.`비행`
      SELECT * 
      FROM db_air.`비행` 
      WHERE `년도` = 1987 
        AND `월` = 10
    """
    save(sql)
  except Exception as e:
    return 0
  return 1

# ETL 항공사 db.py 사용
def etl_N(table:str, year:int = 0, month:int = 0):
  print(f"db_air의 '{table}'table 에서 db_to_air의 '{table}'table 데이터 이관 작업")
  try:
    where = ""
    if year > 0 and month > 0:
      where = f"WHERE `년도` = {year} AND `월` = {month}"
    sql1 = f"SELECT COUNT(*) AS cnt FROM db_air.`{table}` {where}"
    row1 = findOne(sql1)
    print("원본 데이터 건 수 : ", row1["cnt"], " 건")
    
    if int(row1["cnt"]) > 0:
      sql2 = f"DELETE FROM db_to_air.`{table}` {where}"
      sql3 = f"""
          INSERT INTO db_to_air.`{table}`
          SELECT * FROM db_air.`{table}` {where}
        """
      sql4 = f"SELECT COUNT(*) AS cnt FROM db_to_air.`{table}` {where}"
      saveEtl(sql2, sql3)
      row2 = findOne(sql4)
      print("적재 데이터 건 수 : ", row2["cnt"], " 건")
  except Exception as e:
    print(e)
    return 0
  return 1

# 테이블만 변경하는 부분
def set_etl(table:str):
  print(f"db_air의 '{table}'table 에서 db_to_air의 '{table}'table 데이터 이관 작업")
  try:
    sql1 = f"SELECT COUNT(*) AS cnt FROM db_air.`{table}`"
    row1 = findOne(sql1)
    print("원본 데이터 건 수 : ", row1["cnt"], " 건")
    
    if int(row1["cnt"]) > 0:
      sql2 = f"DELETE FROM db_to_air.`{table}`"
      sql3 = f"""
          INSERT INTO db_to_air.`{table}` 
          SELECT * FROM db_air.`{table}`
        """
      sql4 = f"SELECT COUNT(*) AS cnt FROM db_to_air.`{table}`"
      saveEtl(sql2, sql3)
      row2 = findOne(sql4)
      print("적재 데이터 건 수 : ", row2["cnt"], " 건")
  except Exception as e:
    print(e)
    return 0
  return 1


# if __name__ == "__main__":

#   # tuple 조건 수정
#   useYn = tuple([0])
#   for row in jobs(useYn):
#     if row: etl3(row)

#   # jobs 관리 및 log 처리
#   # for row in jobs(1):
#   #   if row: etl3(row)
  
#   # etl2("비행", 1987, 10)
#   # etl2("운반대")
#   # etl2("항공사")


# ETL FastAPI 추가 부분
@app.post("/run")
def etlRun(useYn: tuple[int,...] = ()):
  for row in jobs(useYn):
    if row: etl3(row)
  return RedirectResponse(url="/list")

@app.post("/list")
def jobList():
  try:
    conn = mariadb.connect(**conn_params)
    if conn:
      sql = f"select * from db_to_air.jobs"
      cur = conn.cursor()
      cur.execute(sql)
      rows = cur.fetchall()
      columns = [desc[0] for desc in cur.description]
      cur.close()
      conn.close()
      result = [dict(zip(columns, row)) for row in rows]
      return {"status": True, "result": result}
  except mariadb.Error as e:
    print(f"접속 오류 : {e}")
  return {"status": False}

@app.post("/set")
def jobSet(type: bool = False, jobNo: list[int] = []):
  try:
    conn = mariadb.connect(**conn_params)
    if conn:
      if isinstance(jobNo, (list, tuple)):
        keys = ",".join(map(str, jobNo))
      else:
        keys = jobNo
      sql = f"update db_to_air.jobs set `useYn` = {type} where `no` in ({keys})"
      cur = conn.cursor()
      cur.execute(sql)
      conn.commit()
      cur.close()
      conn.close()
      return RedirectResponse(url="/list")
  except mariadb.Error as e:
    print(f"접속 오류 : {e}")
  return {"status": False}