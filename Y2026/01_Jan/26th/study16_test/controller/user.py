from fastapi import APIRouter
from configs.db import getConn
import mariadb

router = APIRouter(prefix="/user", tags=["사용자"])

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
            return {"status": True, "result":result}
    except mariadb.Error as e:
        print(f"SQL 오류 : {e}")
        return {"status": False}

@router.post(
    path="", 
    summary=["사용자 등록"] , 
    description = "edu.user 등록하기"
    )
def user():
    return {"Hello": "사용자 등록"}

@router.put(
    path="", 
    summary=["사용자 수정"] , 
    description = "edu.user 수정하기"
    )
def user():
    return {"Hello": "사용자 수정"}

@router.delete(
    path="", 
    summary=["사용자 삭제"] , 
    description = "edu.user 삭제하기"
    )
def user():
    return {"Hello": "사용자 삭제"}