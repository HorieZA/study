from fastapi import APIRouter
from configs.db import getConn
import mariadb

router = APIRouter(prefix="/root", tags=["기본"])

@router.get(
    path="", 
    summary=["root list"] , 
    description = "..."
    )
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
            return {"status":True, "result":result}
    except mariadb.Error as e:
        return {"status":False}

@router.post(
    path="", 
    summary=["root insert"] , 
    description = "..."
    )
def root():
    return {"Hello": "root insert"}

@router.put(
    path="", 
    summary=["root update"] , 
    description = "..."
    )
def root():
    return {"Hello": "root update"}
@router.delete(
    path="", 
    summary=["root delete"] , 
    description = "..."
    )
def root():
    return {"Hello": "root delete"}