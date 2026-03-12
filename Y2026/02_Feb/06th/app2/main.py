from fastapi import FastAPI
from kafka import KafkaConsumer
from settings import settings
import threading

def consumer():
  cs = KafkaConsumer(settings.kafka_topic, bootstrap_servers=settings.kafka_server)
  for msg in cs:
    print(msg.value.decode('utf-8'))

def startConsumer():
  thread = threading.Thread(target=consumer, daemon=True)
  thread.start()

app = FastAPI()

@app.get("/")
def read_root():
  return {"msg": "Consumer"}

@app.get("/start")
def start():
  startConsumer()