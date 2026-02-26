from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from db import findOne, findAll, save
from settings import settings
import urllib.parse
import base64
import json
import mariadb
import uuid

SECRET_KEY = "your-extremely-secure-random-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

origins = [ settings.react_url ]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/selUser")
def usrt_delYn(request: Request):
  selectUser = request.cookies.get("selectUser")
  if not selectUser:
    return {"status": False, "msg": "회원정보를 불러오는데 실패하였습니다."}
  
  selectUser = base64Decode(selectUser)
  decoded = urllib.parse.unquote(selectUser)
  data = json.loads(decoded)
  sql =f"""
      SELECT `no`,`name`,`email`,`pwd`,`gender`,`regDate`,`modDate`,`user_id` 
      FROM `edu`.`user` 
      WHERE `email` = '{data["email"]}' AND `user_id` = '{data["user_id"]}'
    """
  if data: 
    data = findOne(sql)
    print(data)
  return {"status":data}


@app.post("/userDelYn")
def usrt_delYn(request: Request):
  userInfo = request.cookies.get("userInfo")
  if not userInfo:
    return {"status": False, "msg": "탈퇴에 실패하였습니다."}
  
  userInfo = base64Decode(userInfo)
  decoded = urllib.parse.unquote(userInfo)
  data = json.loads(decoded)
  sql =f"""
      UPDATE edu.user 
      SET `delYn` = {data["delYn"]} 
      WHERE `no` = {data["no"]} 
      AND `user_id` = {data["user_id"]}
    """
  print(sql)
  if data: 
    save(sql)
  print(data)
  return {"status":data, "msg": "탈퇴 되었습니다.\n감사합니다. 안녕히 가십시오."}


@app.post("/userUpdate")
def usrt_delYn(request: Request):
  userUp = request.cookies.get("userUp")
  if not userUp:
    return {"status": False, "msg": "수정에 실패하였습니다."}
  
  userUp = base64Decode(userUp)
  decoded = urllib.parse.unquote(userUp)
  data = json.loads(decoded)
  sql =f"""
      UPDATE edu.user SET
        `name` = {data["name"]}
        `email` = {data["email"]}
        `pwd` = {data["pwd"]}
        `gender` = {data["gender"]}
      WHERE `no` = {data["no"]}
      AND `user_id` = {data["user_id"]}
    """
  print(sql)
  if data: 
    save(sql)
  print(data)
  return {"status":data, "msg": "수정이 완료되었습니다.\n감사합니다."}

def base64Decode(data):
  encoded = urllib.parse.unquote(data)
  return base64.b64decode(encoded).decode("utf-8")