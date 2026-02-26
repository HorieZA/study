import requests
import pandas as pd
import math
from sqlalchemy import create_engine
import mariadb
from db import findOne, findAll, save
from dotenv import load_dotenv
load_dotenv()
import os

# 1. API 설정
service_key = 'YOUR_SERVICE_KEY' # 발급받은 인증키
base_url = 'http://apis.data.go.kr...' # API 호출 URL (예: 보행자 네트워크)
total_count = 6000 # 예상되는 전체 데이터 건수 (실제 API 응답에서 받아오는 것이 좋음)
rows_per_page = 1000 # 1회 호출 시 데이터 수
total_pages = math.ceil(total_count / rows_per_page) # 총 페이지 수 계산

all_data = []

# DB 연결을 위한 설정
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
  
# 테이블 데이터 유무를 하기위한 설정
# 최초 진행
def getDBdataCK():
  result = None
  try:
    conn = getConn()
    # 테이블의 데이터 유무 체크 SQL
    sql = "SELECT EXISTS (SELECT 1 FROM prj.abandonmentPublic_v2_response) AS DB"
    if conn:
      cur = conn.cursor()
      cur.execute(sql)
      row = cur.fetchone()
      columns = [desc[0] for desc in cur.description]
      cur.close()
      conn.close()
      result = dict(zip(columns, row)) if row else None
      if result["DB"] == False:
        # 테이블에 데이터가 없으면 바로 공공데이터 받기 진행
        print("해당 테이블에 등록된 데이터가 없습니다.\n등록을 시작하겠습니다.")
        getGongData()
      else:
        # 테이블의 데이터 삭제용 delSQL
        delSql = "TRUNCATE TABLE `prj`.`abandonmentPublic_v2_response`;"
        # 테이블에 데이터가 있으면 삭제 후 공공데이터 받기 진행
        print("해당 테이블에 등록된 데이터가 존재합니다.\n삭제 후 등록하겠습니다.")
        tableDel(delSql)
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
  return result

# 공공데이터를 받아오기 위한 설정부분
def getGongData():
  # 2. 반복문을 통한 데이터 수집
  for page in range(1, total_pages + 1):
    params = {
      'serviceKey': os.getenv("SVIKEY"),
      'pageNo': str(page),
      'numOfRows': str(rows_per_page),
      '_type': 'json' # 또는 XML
    }
    # 받아올 공공데이터의 URL 설정 부분
    response = requests.get(os.getenv("BSURL"), params=params)
    
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
      
      # 데이터 프레임으로 변환된 공공데이터를 BD로 전송하기 위한 설정
      # 1. MariaDB 연결 정보 설정
      # 구조: mariadb+mariadbconnector://ID:PW@HOST:PORT/DB_NAME
      DB_USER = os.getenv("DB_USERS")
      DB_PW = os.getenv("DB_PW")
      DB_HOST = os.getenv("DB_HOSTS")
      DB_PORT = os.getenv("DB_PORTS")
      DB_NAME = os.getenv("DB_NAMES")
      
      # 2. SQLAlchemy 엔진 생성
      # 만약 pymysql을 사용한다면: f"mysql+pymysql://{DB_USER}:{DB_PW}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
      # mariadb용
      connection_string = f"mariadb+mariadbconnector://{DB_USER}:{DB_PW}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
      engine = create_engine(connection_string)
      
      # 3. 데이터프레임을 DB로 전송
      # to_sql은 자동으로 커밋을 처리하므로, 별도의 commit 명령어가 필요하지 않음
      try:
        df.to_sql(
          name=f'abandonmentPublic_v2_response',  # 생성하거나 추가할 테이블 이름
          con=engine,                             # 연결 엔진
          if_exists='append',                     # 'fail'(기본), 'replace'(기존 삭제 후 생성), 'append'(이어서 추가)
          index=False                             # 데이터프레임의 인덱스는 컬럼으로 저장하지 않음
          )
        print("성공적으로 데이터가 등록되었습니다.")
      except Exception as e:
        print(f"오류가 발생했습니다: {e}")
    else:
      print("Request failed with status code:", response.status_code)
  
  # 중복 데이터 검색을 위한 SQL
  sql = f"""
      SELECT noticeNo, desertionNo, kindCd, COUNT(*) AS cnt
      FROM abandonmentPublic_v2_response
      GROUP BY noticeNo, desertionNo, kindCd
      HAVING COUNT(noticeNo) > 1 AND COUNT(desertionNo) > 1 AND COUNT(kindCd) > 1;
      """
  finOverlap(sql)

# 중복 데이터 삭제를 위한 중복 데이터 체크 설정
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
        # 중복 데이터 존재 시 중복 데이터 삭제를 위한 SQL
        sql = f"""
              DELETE FROM prj.abandonmentPublic_v2_response
              WHERE dpNo IN (
                SELECT dpNo
                FROM (
                  SELECT dpNo,
                        ROW_NUMBER() OVER (
                          PARTITION BY noticeNo, desertionNo, kindCd
                          ORDER BY updTm DESC
                        ) AS row_num
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
      dsSql = f"""
              INSERT INTO prj.desertion_public (
                noticeNo, srvcTxt, popfile4, sprtEDate, desertionNo, rfidCd, happenDt, 
                happenPlace, kindCd, colorCd, age, weight, evntImg, updTm, endReason,
                careRegNo, noticeSdt, noticeEdt, popfile1, processState, sexCd, neuterYn, 
                specialMark, careNm, careTel, careAddr, orgNm, sfeSoci, sfeHealth, etcBigo, 
                kindFullNm, upKindCd, upKindNm, kindNm, popfile2, popfile3, popfile5, popfile6, 
                popfile7, popfile8, careOwnerNm, vaccinationChk, healthChk, adptnTitle, adptnSDate,
                adptnEDate, adptnConditionLimitTxt, adptnTxt, adptnImg, sprtTitle, sprtSDate, 
                sprtConditionLimitTxt, sprtTxt, sprtImg, srvcTitle, srvcSDate, srvcEDate, 
                srvcConditionLimitTxt, srvcImg, evntTitle, evntSDate, evntEDate,
                evntConditionLimitTxt, evntTxt, opDataYn
              )
              SELECT
                A.noticeNo, A.srvcTxt, A.popfile4, A.sprtEDate, A.desertionNo, A.rfidCd, A.happenDt,
                A.happenPlace, A.kindCd, A.colorCd, A.age, A.weight, A.evntImg, A.updTm, A.endReason,
                A.careRegNo, A.noticeSdt, A.noticeEdt, A.popfile1, A.processState, A.sexCd, A.neuterYn, 
                A.specialMark, A.careNm, A.careTel, A.careAddr, A.orgNm, A.sfeSoci, A.sfeHealth, A.etcBigo,
                A.kindFullNm, A.upKindCd, A.upKindNm, A.kindNm, A.popfile2, A.popfile3, A.popfile5, A.popfile6,
                A.popfile7, A.popfile8, A.careOwnerNm, A.vaccinationChk, A.healthChk, A.adptnTitle, A.adptnSDate,
                A.adptnEDate, A.adptnConditionLimitTxt, A.adptnTxt, A.adptnImg, A.sprtTitle, A.sprtSDate, 
                A.sprtConditionLimitTxt, A.sprtTxt, A.sprtImg, A.srvcTitle, A.srvcSDate, A.srvcEDate, 
                A.srvcConditionLimitTxt, A.srvcImg, A.evntTitle, A.evntSDate, A.evntEDate,
                A.evntConditionLimitTxt, A.evntTxt, A.opDataYn
              FROM prj.abandonmentPublic_v2_respons AS A
              LEFT JOIN prj.desertion_public AS D
                ON D.noticeNo = A.noticeNo
                AND D.desertionNo = A.desertionNo
                WHERE D.updTm IS NULL
                OR A.updTm > D.updTm
              ON DUPLICATE KEY UPDATE
                noticeNo	  = VALUES(noticeNo),		  srvcTxt         = VALUES(srvcTxt),
                popfile4	  = VALUES(popfile4),		  sprtEDate       = VALUES(sprtEDate),
                desertionNo	= VALUES(desertionNo),	rfidCd		      = VALUES(rfidCd),
                happenDt	  = VALUES(happenDt), 		happenPlace     = VALUES(happenPlace),
                kindCd		  = VALUES(kindCd),		    colorCd			    = VALUES(colorCd),
                age			    = VALUES(age),			    weight			    = VALUES(weight),
                evntImg		  = VALUES(evntImg),  		updTm           = VALUES(updTm),
                endReason	  = VALUES(endReason),  	careRegNo       = VALUES(careRegNo),
                noticeSdt	  = VALUES(noticeSdt),	  noticeEdt 		  = VALUES(noticeEdt),
                popfile1	  = VALUES(popfile1), 		processState  	= VALUES(processState),
                sexCd		    = VALUES(sexCd),		    neuterYn  	  	= VALUES(neuterYn),
                specialMark	= VALUES(specialMark),	careNm		    	= VALUES(careNm),
                careTel		  = VALUES(careTel),  		careAddr	    	= VALUES(careAddr),
                orgNm		    = VALUES(orgNm),		    sfeSoci		    	= VALUES(sfeSoci),
                sfeHealth	  = VALUES(sfeHealth),  	etcBigo	  	  	= VALUES(etcBigo),
                kindFullNm	= VALUES(kindFullNm),	  upKindCd	  	  = VALUES(upKindCd),
                upKindNm	  = VALUES(upKindNm), 		kindNm		    	= VALUES(kindNm),
                popfile2	  = VALUES(popfile2),	  	popfile3	    	= VALUES(popfile3),
                popfile5	  = VALUES(popfile5),	  	popfile6	  	  = VALUES(popfile6),
                popfile7	  = VALUES(popfile7),	  	popfile8        = VALUES(popfile8),
                careOwnerNm	= VALUES(careOwnerNm),	vaccinationChk	= VALUES(vaccinationChk),
                healthChk	  = VALUES(healthChk),  	adptnTitle		  = VALUES(adptnTitle),
                adptnSDate	= VALUES(adptnSDate), 	adptnEDate	  	= VALUES(adptnEDate),
                adptnConditionLimitTxt = VALUES(adptnConditionLimitTxt),
                adptnTxt	  = VALUES(adptnTxt), 		adptnImg        = VALUES(adptnImg),
                sprtTitle	  = VALUES(sprtTitle),  	sprtSDate       = VALUES(sprtSDate),
                sprtConditionLimitTxt = VALUES(sprtConditionLimitTxt),
                sprtTxt		  = VALUES(sprtTxt),	  	sprtImg         = VALUES(sprtImg),
                srvcTitle	  = VALUES(srvcTitle),	  srvcSDate       = VALUES(srvcSDate),
                srvcEDate	  = VALUES(srvcEDate),
                srvcConditionLimitTxt = VALUES(srvcConditionLimitTxt),
                srvcImg		  = VALUES(srvcImg),		  evntTitle       = VALUES(evntTitle),
                evntSDate	  = VALUES(evntSDate),	  evntEDate       = VALUES(evntEDate),
                evntConditionLimitTxt = VALUES(evntConditionLimitTxt),
                evntTxt		  = VALUES(evntTxt),		  opDataYn        = VALUES(opDataYn);
              """
      # * 주의: target_table에 유니크 키 또는 기본키(PK)가 설정되어 있어야 작동 [4, 7, 11].
      # 2. 끝나면 careAddress 테이블에 주소 데이터 집어 넣기
      caSql = f"""
              SELECT DISTINCT orgNm, careNm, careTel, careAddr
              FROM prj.abandonmentPublic_v2_response 
              GROUP BY REPLACE(careNm, ' ', '')
              ORDER BY orgNm;
              """
      if result:
      # 1. desertion_public 테이블에 데이터 넣기 단, 값이 같은 데이터가 있으면 update
        saveTable(dsSql)
      # 2. 끝나면 careAddress 테이블에 주소 데이터 집어 넣기
        # saveTable(caSql)
  except mariadb.Error as e:
    print(f"Del MariaDB Error : {e}")
  return result

# 보기용 테이블에 INSERT
def saveTable(sql):
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
      print("보기용 테이블에 저장 완료하였습니다.")
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

# careAddress 테이블에 주소 데이터 집어 넣기용
def getDBAddData():
  result = None
  try:
    conn = getConn()
    # careAddress 테이블에 주소 데이터 집어 넣기
    sql = f"""
          SELECT DISTINCT orgNm, careNm, careTel, careAddr, REPLACE(careAddr, ' ', '')
          FROM prj.abandonmentPublic_v2_response 
          GROUP BY REPLACE(careNm, ' ', '')
          ORDER BY orgNm;
          """
    if conn:
      cur = conn.cursor()
      cur.execute(sql)
      rows = cur.fetchall() 
      columns = [desc[0] for desc in cur.description]
      cur.close()
      conn.close()
      result = [dict(zip(columns, row)) for row in rows]
      if result["DB"] == False:
        # 테이블에 데이터가 없으면 바로 공공데이터 받기 진행
        print("해당 테이블에 등록된 데이터가 없습니다.\n등록을 시작하겠습니다.")
        getGongData()
      else:
        # 테이블의 데이터 삭제용 delSQL
        delSql = "TRUNCATE TABLE `prj`.`abandonmentPublic_v2_response`;"
        # 테이블에 데이터가 있으면 삭제 후 공공데이터 받기 진행
        print("해당 테이블에 등록된 데이터가 존재합니다.\n삭제 후 등록하겠습니다.")
        tableDel(delSql)
  except mariadb.Error as e:
    print(f"MariaDB Error : {e}")
  return result

# def select(args):
#   sql = """
#         SELECT `id`, 
#                `word`, 
#                DATE_FORMAT(`regDate`, '%Y-%m-%d %H:%i:%s') AS regDate
#         FROM edu.study
#         """
#   list = findAll(sql)
#   print(f"번호\t글자\t생성일자")
#   print("-"*50)
#   for row in list:
#     print(f"{row["id"]}\t{row["word"]}\t{row["regDate"]}")
#   sql = """ 
#         SELECT `id`, 
#                `word`, 
#                DATE_FORMAT(`regDate`, '%Y-%m-%d %H:%i:%s') AS regDate
#         FROM edu.study
#         WHERE `id` = 2
#       """
#   row = findOne(sql)
#   print(f"{row["id"]}\t{row["word"]}\t{row["regDate"]}")

# def insert(args):
#   sql = f"INSERT INTO edu.study (`word`) VALUE ('{args.word}')"
#   save(sql)
#   select(None)

# def update(args):
#   sql = f"UPDATE edu.study SET `word` = '{args.word}' WHERE `id` = {args.id}"
#   save(sql)
#   select(None)