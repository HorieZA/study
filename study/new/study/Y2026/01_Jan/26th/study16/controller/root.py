from fastapi import APIRouter
from configs.db import getConn
import mariadb

# prefix를 사용하여 아래에 "/"를 "" 변경하면 prefix에서 관리할 수 있다.
# main에서 빼서 기본을 생성하는 경우 prefix="/"를 사용하면 안됨
# prefix="/root"으로 입력해야함
router = APIRouter(prefix="/root", tags=["기본"])

# 조회
@router.get(path="")
def root():
    try:
        conn = getConn()
        if conn:
            cur = conn.cursor()
            sql = "select 1 as no"
            cur.execute(sql)
            row = cur.fetchone() 
            columns = [desc[0] for desc in cur.description]
            result = dict(zip(columns, row)) if row else None
            cur.close()
            conn.close()
            return{"status":True, "result":result}
    except mariadb.Error as e:
        return{"status": False}
    
    
# @router.get(path="")
# def root():
#     try:
#         conn = getConn()
#         print(conn)
#         return {"status" : True}
#     except mariadb.Error as e:
#         return {"status" : False}


# @router.get(path="")
# def root():
#     return {"Hello": "World"}