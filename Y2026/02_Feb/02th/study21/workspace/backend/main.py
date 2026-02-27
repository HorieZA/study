from fastapi import FastAPI, Request, Response, Cookie
import redis
import uuid

from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

app = FastAPI()

SECRET_KEY = "your-extremely-secure-random-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

client= redis.Redis(
    host="192.168.0.250",
    port=6379,
    db=0
  )
print(type(client))


@app.get("/set")
def setRedis(response:Response):
  id = uuid.uuid4().hex
  iat = datetime.now(timezone.utc) + (timedelta(hours=7))
  exp = iat + (timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
  data = {
    "iss": "EDU", 
    "sub": "이번에는 시간 포함하여 올려보았습니다.\n감사합니다.", 
    "iat": iat,
    "exp": exp
    }
  token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
  client.setex(f"3team:{id}", 60*60*24, token)
  response.set_cookie(
        key="data",
        value=id,
        max_age=60 * 60,        # 1시간 (초)
        expires=60 * 60,        # max_age와 유사 (초)
        path="/",
        domain="localhost",
        secure=True,            # HTTPS에서만 전송
        httponly=True,          # JS 접근 차단 (⭐ 보안 중요)
        samesite="lax",         # 'lax' | 'strict' | 'none'
    )
  return {"status": True}

@app.get("/get")
def getRedis(request:Request):
  id = request.cookies.get("data")
  result = client.get(f"fastapi:{id}")
  return {"result": result}

@app.get("/del")
def delete(request:Request, response:Response):
  id = request.cookies.get("data")
  client.delete(f"fastapi:{id}")
  response.delete_cookie(key="data")
  return {"status": True}

@app.get("/")
def read_root():
  return {"Hello": "World"}