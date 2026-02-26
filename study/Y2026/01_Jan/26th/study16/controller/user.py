from fastapi import APIRouter
from configs.db import getConn
import mariadb

# prefix를 사용하여 아래에 "/"를 "" 변경하면 prefix에서 관리할 수 있다.
router = APIRouter(prefix="/user", tags=["사용자"])

# 조회
@router.get(
    path="", 
    summary=["사용자 목록"] , 
    description = "edu.user 테이블 전체 가져오기"
    )
def user():
    try:
        conn = getConn()
        if conn:
            cur = conn.cursor()
            sql = "SELECT * FROM edu.user"
            cur.execute(sql)
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            cur.close()
            conn.close()
            return {"status" : True, "result" : result}
    except mariadb.Error as e:
        print(f"SQL 오류 : {e}")
        return {"status" : False}

# 상세 조회 TEST
# @router.get(
#     path="", 
#     summary=["사용자 상세"] , 
#     description = "edu.user 테이블 상세 가져오기")
# def userPart():
#     try:
#         conn = getConn()
#         if conn:
#             cur = conn.cursor()
#             sql = f"SELECT * FROM edu.user WHERE `no` = 1"
#             cur.execute(sql)
#             columns = [desc[0] for desc in cur.description]
#             row = cur.fetchone()
#             result = dict(zip(columns, row)) if row else None
#             cur.close()
#             conn.close()
#             return {"status" : True, "result" : result}
#     except mariadb.Error as e:
#         print(f"SQL 오류 : {e}")
#     return {"status" : False}

# 등록
@router.post("")
def user():
    return {"Hello": "World"}

# 수정
@router.put("")
def user():
    return {"Hello": "World"}

# 삭제
@router.delete("")
def user():
    return {"Hello": "World"}