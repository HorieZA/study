from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from pydantic import BaseModel
import uuid

app = FastAPI()

origins = [ "http://localhost:5173" ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "homework-3team-light-dark-whoareyou-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

storage = {}

class userInfo(BaseModel) :
  name : str
  theme : str

def set_token(name: str, theme: str) :
    try :
      iat = datetime.now(timezone.utc)
      exp = iat + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
      payload = {
          "name" : name,
          "theme" : theme,
          "iss" : "team3",
          "iat" : iat,
          "exp" : exp
      }
      return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    except JWTError as e :
       print(f"JWT 생성 에러 : {e}")
       return None

# def get_user(id : str) :
#   if id and id in storage :
#     token = storage[id]
#     try :
#       payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
#       return payload
#     except JWTError :
#       return None
#   return None

@app.post("/")
def set(data: userInfo, response: Response) :
    token = set_token(data.name, data.theme)
    id = uuid.uuid4().hex
    storage[id] = token

    response.set_cookie(
      key="id",
      value=id,
      max_age=60 * 60,        
      expires=60 * 60,        
      path="/",
      domain="localhost",
      secure=True,            
      httponly=True,          
      samesite="lax", 
    )
    return { "status" : True, "result" : [data.name, data.theme], "token" : id}

@app.get("/getuser")
def getUser(request : Request) :
  ck = request.cookies.get("id")
  if ck in storage :
    token = storage[ck]
    try :
      payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
      return {
        "status" : True,
        "result" : [payload["name"], payload["theme"]]
      }
    except JWTError :
      return {"status" : False, "result" : ["토큰 만료", "light"]}
  return {"status" : False, "result" : ["누구세용?", "light"]}

@app.get("/deluser")
def delUser(request : Request, response : Response) :
  ck = request.cookies.get("id")
  if ck in storage :
    del storage[ck]
    print(f"삭제 완료 : {ck}")
  response.delete_cookie(key="id")
  return {"status" : True, "message" : "삭제되었습니다"}
  