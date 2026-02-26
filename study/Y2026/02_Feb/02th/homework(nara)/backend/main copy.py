from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
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

def get_user(id : str) :
  if id and id in storage :
    token = storage[id]
    try :
      payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
      return payload
    except JWTError :
      return None
  return None

@app.get("/")
def set(request : Request, response: Response, name : str = None, theme : str = None) :
  if name and theme :
    token = set_token(name, theme)
    user_name = uuid.uuid4().hex
    storage[user_name] = token
    response.set_cookie(
      key="user_name",
      value=user_name,
      max_age=60 * 60,        
      expires=60 * 60,        
      path="/",
      domain="localhost",
      secure=True,            
      httponly=True,          
      samesite="lax", 
    )
    return { "status" : True, "result" : [name, theme], "token" : user_name}

  ck = request.cookies.get("user_name")
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