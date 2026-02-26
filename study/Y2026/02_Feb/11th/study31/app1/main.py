from fastapi import FastAPI, File, UploadFile, Form 
from fastapi.responses import FileResponse
from pathlib import Path
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import shutil
import uuid
from db import findOne, findAll, save, add_key

# 파일 유형을 받기 위해 선언
class FileItem(BaseModel):
  filename: str
  content_type: str
  content_base64: str

# 파일을 받아오기 위해 선언
class FileModel(BaseModel):
  txt: str
  files: List[str]

app = FastAPI()

origins = [ "http://localhost:5173", "http://app2:5173", "http://app2" ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}
MAX_FILE_SIZE = 10 * 1024

# DB 넣기 전 테스트
db = []

# 없으면 패스 있으면 실행
# 업로드할때 적용할 예정
def checkDir():
  UPLOAD_DIR.mkdir(exist_ok=True)

# backend에 uploads 폴더 생성 후 파일을 업로드 할 수 있도록 코드 선언
# 단, 현재는 이름이 같으면 최종 업로드된 파일이 등록됨
def saveFile(file):
  checkDir()
  # path = UPLOAD_DIR / file.filename
  # path = UPLOAD_DIR / uuid.uuid4().hex
  id = uuid.uuid4().hex
  origin = file.filename
  ext = origin.split(".")[-1].lower()
  newName = f"{uuid.uuid4().hex}.{ext}"
  # data = {"id":id, "origin": origin, "ext": ext, "newName": newName}
  # db.append(data)
  sql = f"""
        INSERT into edu.`file` (`origin`, `ext`, `fileName`, `contentType`) 
        VALUE ('{origin}', '{ext}', '{newName}', '{file.content_type}')
      """
  result = add_key(sql)
  if result[0]:
    path = UPLOAD_DIR / newName
    with path.open("wb") as f:
      shutil.copyfileobj(file.file, f)
    return result[1]
  return 0

@app.get("/")
def root():
  return {"status": True}

# "POST", "PUT", "PATCH" 메서드는 파일 업로드에 사용 가능
# text 값은 def upload(txt: str, file: UploadFile = File()) 형태로는 받기 불가
@app.post("/upload")
# def upload(file1: UploadFile = File(), file2: UploadFile = File()):
# def upload(files: List[UploadFile] = File()):
def upload(files: List[UploadFile] = File(), txt: str = Form()):
  print("text:",txt)
  print("files:",files)
  return {"status": True}

@app.post("/upload2")
def upload(model: FileModel):
  # print(model.txt)
  # print(model.files)
  print(model)  
  return {"status": True}

@app.post("/upload3")
def upload(files: List[UploadFile] = File(), txt: str = Form()):
  print("text:",txt)
  arr = []
  for file in files:
    arr.append(saveFile(file))
  return {"status": True, "result" : arr}

#  db 사용하면 필요없으므로 주석 처리
# @app.get("/images")
# def images():
#   return {"status": True, "result" : db}

@app.get("/download")
def downlod(id: str):
  # for row in db:
  #   if row["id"] == id:
  #     newName = row["newName"]
  #     origin = row["origin"]
  #     break
  sql = f"""
      SELECT `origin`, `fileName` 
      FROM edu.`file`
      WHERE `no` = '{id}'
    """
  result = findOne(sql)
  if result:
    print(result)
    origin = result["origin"]
    newName = result["fileName"]

    path = UPLOAD_DIR / newName
    return FileResponse(path=path)
    # return FileResponse(path=path, filename=origin)
  return {"status": False}
  # if newName:
  #   print(newName)
  #   path = UPLOAD_DIR / newName
  #   # 뷰만 보여줄 경우 사용
  #   # return FileResponse(path=path)
  #   # 파일 다운로드까지 가능
  #   return FileResponse(path=path, filename=origin)
  # return {"status": False}