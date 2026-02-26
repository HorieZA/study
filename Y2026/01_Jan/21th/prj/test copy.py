import requests
import pandas as pd
import math
from sqlalchemy import create_engine
import mariadb
from dotenv import load_dotenv
load_dotenv()
import os

all_tables = ['abandonmentPublic', 'sigungu_v2', 'sido_v2', 'shelter', 'kind']
all_table = ['abandonmentPublic','sido_v2']

all_URL = ['BSURL', 'SGGURL', 'SDURL', 'SHURL', 'KDUR']

# 1. API 설정
service_key = 'YOUR_SERVICE_KEY' # 발급받은 인증키
base_url = 'http://apis.data.go.kr...' # API 호출 URL (예: 보행자 네트워크)
total_count = 6000 # 예상되는 전체 데이터 건수 (실제 API 응답에서 받아오는 것이 좋음)
rows_per_page = 1000 # 1회 호출 시 데이터 수
# total_count = 30 # 예상되는 전체 데이터 건수 (실제 API 응답에서 받아오는 것이 좋음)
# rows_per_page = 10 # 1회 호출 시 데이터 수
total_pages = math.ceil(total_count / rows_per_page) # 총 페이지 수 계산

all_data = []

def getConn():
  try:
    return mariadb.connect(
      user=os.getenv("DB_USERS"),
      password=os.getenv("DB_PW"),
      host=os.getenv("DB_HOSTS"),
      port=int(os.getenv("DB_PORTS")),
      database=os.getenv("DB_NAMES")
      )
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
    return None
# 테이블 데이터 유무 체크 후 테이블 데이터 삭제
def getDBdataCK(age):
  result = None
  try:
    conn = getConn()
    sql = f"""
         SELECT EXISTS (SELECT 1 FROM prj.{all_table[int(age)]}_v2_response) AS DB
         """
    delSql = f"TRUNCATE TABLE `prj`.`{all_table[int(age)]}_v2_response`;"
    print(sql)
    print(delSql)
    # if conn:
    #   cur = conn.cursor()
    #   cur.execute(sql)
    #   row = cur.fetchone()
    #   columns = [desc[0] for desc in cur.description]
    #   cur.close()
    #   conn.close()
    #   result = dict(zip(columns, row)) if row else None
    #   if result["DB"] == False:
    #     print("해당 테이블에 등록된 데이터가 없습니다.\n등록을 시작하겠습니다.")
    #     getGongData(int(age))
    #   else:
    #     print("해당 테이블에 등록된 데이터가 존재합니다.\n삭제 후 등록하겠습니다.")
    #     tableDel(delSql)
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
  return result

def getGongData(age):
    # 2. 반복문을 통한 데이터 수집
    for page in range(1, total_pages + 1):
        params = {
            'serviceKey': os.getenv("SVIKEY"),
            'pageNo': str(page),
            'numOfRows': str(rows_per_page),
            '_type': 'json' # 또는 XML
        }
        
        response = requests.get(os.getenv(f"{all_URL[int(age)]}"), params=params)
        
        if response.status_code == 200:
            
            # 문자열 json파일로 변환
            # 출력된 문자열을 json파일로 변환해주자
            # 데이터 타입이 dict 형태로 변환된 것을 볼 수 있다!
                        
            data = response.json()
            
            # 3. 데이터 파싱 (API 구조에 따라 item 위치가 다를 수 있음)
            items = data['response']['body']['items']['item']

            all_data.extend(items)
            print(f"{page} 페이지 완료. 현재까지 {len(all_data)}건 수집.")
                        
            # 4. 데이터프레임으로 변환
            df = pd.DataFrame(all_data)
            print("전체 데이터 수집 완료:", df.shape)

            
            # 2. MariaDB 연결 정보 설정
            # 구조: mariadb+mariadbconnector://ID:PW@HOST:PORT/DB_NAME
            DB_USER = os.getenv("DB_USERS")
            DB_PW = os.getenv("DB_PW")
            DB_HOST = os.getenv("DB_HOSTS")
            DB_PORT = os.getenv("DB_PORTS")
            DB_NAME = os.getenv("DB_NAMES")

            # 3. SQLAlchemy 엔진 생성
            # 만약 pymysql을 사용한다면: f"mysql+pymysql://{DB_USER}:{DB_PW}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
            connection_string = f"mariadb+mariadbconnector://{DB_USER}:{DB_PW}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
            engine = create_engine(connection_string)

            # 4. 데이터프레임을 DB로 전송
            try:
                df.to_sql(
                    name=f'{all_table[int(age)]}_v2_response',      # 생성하거나 추가할 테이블 이름
                    con=engine,              # 연결 엔진
                    if_exists='append',      # 'fail'(기본), 'replace'(기존 삭제 후 생성), 'append'(이어서 추가)
                    index=False              # 데이터프레임의 인덱스는 컬럼으로 저장하지 않음
                )
                print("성공적으로 데이터가 등록되었습니다.")
            except Exception as e:
                print(f"오류가 발생했습니다: {e}")
        else:
            print("Request failed with status code:", response.status_code)
    for r in range(age):
      sql(r) = f"""
          SELECT noticeNo, desertionNo, kindCd, COUNT(*) AS cnt
          FROM abandonmentPublic_v2_response
          GROUP BY noticeNo, desertionNo, kindCd
          HAVING COUNT(noticeNo) > 1 AND COUNT(desertionNo) > 1 AND COUNT(kindCd) > 1;
          """
      finOverlap(sql(r))
       
def finOverlap(sql):
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
      if result:
        sql = f"""
              DELETE FROM prj.abandonmentPublic_v2_response
              WHERE noticeNo IN (
                SELECT noticeNo
                  FROM (
                    SELECT noticeNo, ROW_NUMBER() OVER (PARTITION BY noticeNo, desertionNo, kindCd) AS row_num
                      FROM prj.abandonmentPublic_v2_response 
                  ) tmp
                WHERE row_num > 1
              );
              """
        overlapDel(sql)
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
  return result

# 중복 데이터 삭제용
def overlapDel(sql):
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
      print("중복 데이터 삭제를 완료하였습니다.")
      # 1. desertion_public 테이블에 데이터 넣기 단, 값이 같은 데이터가 있으면 update
      # 2. 끝나면 careAddress 테이블에 주소 데이터 집어 넣기
  except mariadb.Error as e:
    print(f"Del MariaDB Error : {e}")
  return result

# 테이블 데이터 삭제용
def tableDel(sql):
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
      print("테이블의 데이터 삭제를 완료하였습니다.")
      getGongData()
  except mariadb.Error as e:
    print(f"Del TABLE Error : {e}")
  return result