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

# 메모리 저장소
data = []

# 이름으로 배경색 불러오기
@app.get("/load/{username}")
def load_color(username: str, request: Request):
    
    data_cookie = request.cookies.get("dataCookie")
    if not data_cookie:
        return {"status": False}
    # 쿠키에 저장된 값을 가져오기 위한 부분
    decoded = base64.b64decode(urllib.parse.unquote(data_cookie)).decode("utf-8")
    data = json.loads(decoded)
    
    for item in data:
        if item["user"] == username:
            return {"status": True, "bgColor": item["bgColor"]}
        
    return {"status": False, "msg": "해당 이름은 없는 이름입니다."}

@app.post("/save")
def save_color(request: Request):
  colorInfo = request.cookies.get("colorInfo")
  if not colorInfo:
    return {"status": False}
  
  colorInfo = base64Decode(colorInfo)
  decoded = urllib.parse.unquote(colorInfo)
  info = json.loads(decoded)
  
  # 기존 이름이 있으면 업데이트
  for item in data:
      if item["user"] == info["user"]:
          item["user"] = info["user"]
          break
  else:
      data.append(info)
  
  # 서버 메모리 전체를 쿠키에 담아 응답
  cookie_value = base64.b64encode(json.dumps(data).encode()).decode()
  response = JSONResponse({"status": True})
  response.set_cookie(
    key="dataCookie",
    value=cookie_value,
    httponly=False,
    samesite="lax",
    secure=False,
    path="/"
  )
  
  # 이후 response으로 던짐
  return response

def base64Decode(data):
  encoded = urllib.parse.unquote(data)
  return base64.b64decode(encoded).decode("utf-8")