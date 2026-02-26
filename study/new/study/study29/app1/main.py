from fastapi import FastAPI, Depends, HTTPException, status
from kafka import KafkaProducer
from settings import settings
from pydantic import EmailStr, BaseModel
import json
import redis
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError, ExpiredSignatureError
from db import findOne
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware

security = HTTPBearer()

class EmailModel(BaseModel):
  email: EmailStr

class CodeModel(BaseModel):
  id: str


def set_token(email: str):
  try:
    sql = f"SELECT `no`, `name` FROM edu.user WHERE `email` = '{email}'"
    data = findOne(sql)
    if data:
      iat = datetime.now(timezone.utc)
      exp = iat + (timedelta(minutes=settings.access_token_expire_minutes))
      data = {
        "name": data["name"],
        "iss": "EDU",
        "sub": str(data["no"]),
        "iat": iat,
        "exp": exp
      }
      return jwt.encode(data, settings.secret_key, algorithm=settings.algorithm)
  except JWTError as e:
    print(f"JWT ERROR : {e}")
  return None

def get_payload(credentials: HTTPAuthorizationCredentials = Depends(security)):
  if credentials.scheme == "Bearer":
    try:
      payload = jwt.decode(credentials.credentials, settings.secret_key, algorithms=settings.algorithm)
      exp = payload.get("exp")

      now = datetime.now(timezone.utc).timestamp()
      minutes, remaining_seconds = divmod(int(exp - now), 60)
      return payload
    except ExpiredSignatureError as e:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token expired",
      )
    except JWTError as e:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token",
      )
  return None

app = FastAPI(title="Producer")

kafka_server=settings.kafka_server
kafka_topic=settings.kafka_topic

pd = KafkaProducer(
  bootstrap_servers=kafka_server,
  value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

client = redis.Redis(
  host=settings.redis_host,
  port=settings.redis_port,
  db=settings.redis_db,
  decode_responses=True
)

origins = [ settings.react_url ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.post("/login")
def producer(model: EmailModel):
  pd.send(settings.kafka_topic, dict(model))
  pd.flush()
  return {"status": True}

@app.post("/code")
def code(model: CodeModel):
  print(model.id)
  result = client.get(model.id)
  if result:
    access_token = set_token(result)
    if access_token:
      # model에 있는 데이터 삭제
      client.delete(model.id)
      return {"status": True, "access_token": access_token}
  return {"status": False}

@app.post("/me")
def me(payload = Depends(get_payload)):
  if payload:
    return {"status": True, "no": payload["sub"], "name": payload["name"]}
  return {"status": False}