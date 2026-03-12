from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from settings import settings
import urllib.parse
import base64
import json


origins = [ settings.react_url ]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
  return { "status": True }

# @app.post("/board")
# def board(request: Request):
#   boardInfo = request.cookies.get("boardInfo")
#   print(base64Decode(boardInfo))
#   boardInfo = base64Decode(boardInfo)
#   decoded = urllib.parse.unquote(boardInfo)
#   data = json.loads(decoded)
#   print(data)
#   return {"boardInfo":data}

# def base64Decode(data):
#   encoded = urllib.parse.unquote(data)
#   return base64.b64decode(encoded).decode("utf-8")


@app.post("/board")
def board(request: Request):
  boardInfo = request.cookies.get("boardInfo")
  if boardInfo:
    # print(base64Decode(boardInfo))
    boardInfo = base64Decode(boardInfo)
    decoded = urllib.parse.unquote(boardInfo)
    data = json.loads(decoded)
  else:
    data = { "no": 1, "title": "데이터가 없네요.", "cont": "데이터가 없어서 직접 보냅니다.", "user": "남영준" }
  
  # 다시 쿠키에 넣기 위해 선언
  # response = JSONBbase64(data)

  # 다시 쿠키에 넣을 값 
  # data를 다시 JSON → base64
  cookie = json.dumps(data)
  cookie = base64.b64encode(cookie.encode()).decode()
  
  #fastapi의 Response가 아닌 fastapi.responses를 이용
  response = JSONResponse( content={"boardInfo": data} )
  
  response.set_cookie(
    key="nyj",
    value=cookie,
    # httponly=True,
    httponly=False,
    samesite="lax",
    secure=False
  )

  # 이후 response으로 던짐
  print(response)
  return response

def base64Decode(data):
  encoded = urllib.parse.unquote(data)
  return base64.b64decode(encoded).decode("utf-8")

# 다시 쿠키에 넣기 위해 선언
def JSONBbase64(data):
  # 다시 쿠키에 넣을 값 
  # data를 다시 JSON → base64
  cookie = json.dumps(data)
  cookie = base64.b64encode(cookie.encode()).decode()
  
  #fastapi의 Response가 아닌 fastapi.responses를 이용
  response = JSONResponse( content={"boardInfo": data} )
  
  response.set_cookie(
    key="nyj",
    value=cookie,
    # httponly=True,
    httponly=False,
    samesite="lax",
    secure=False
  )
  return response