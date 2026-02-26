from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from kafka import KafkaProducer
from settings import settings
import urllib.parse
import base64
import json

origins = [settings.react_url]

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


pd = KafkaProducer(
    bootstrap_servers=settings.kafka_server,
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
)


@app.get("/")
def read_root():
    return {"msg": "Producer"}


@app.post("/pd")
def save_color(request: Request):
    msgInfo = request.cookies.get("msgInfo")
    if not msgInfo:
        return {"status": False, "msg": "데이터 받아오는 것에 실패하였습니다."}

    msgInfo = base64Decode(msgInfo)
    decoded = urllib.parse.unquote(msgInfo)
    info = json.loads(decoded)

    pd.send(settings.kafka_topic, info)
    pd.flush()
    return {"status": True, "msg": "이메일을 발송하였습니다."}


def base64Decode(data):
    encoded = urllib.parse.unquote(data)
    return base64.b64decode(encoded).decode("utf-8")


# @app.post("/pd")
# def producer(msg: str):
#   pd.send(settings.kafka_topic, msg.encode("utf-8"))
#   pd.flush()
#   return{"status": True}
