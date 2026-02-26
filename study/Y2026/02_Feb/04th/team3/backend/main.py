from fastapi import FastAPI, Header, Response, Request, Depends, HTTPException, Cookie
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from db import findOne, findAll, save
from pydantic import BaseModel
import urllib.parse
import base64
import json
import mariadb
import uuid

app = FastAPI()

# CORS 설정
origins = [ "http://localhost:5173", "http://192.168.0.180:5173" ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 설정값 통일
SECRET_KEY = "project-3team-user-board-add-view-login-logout-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 데이터 모델 정의
class userInfo(BaseModel):
    name: str
    email: str
    pwd: str
    gender: str

# 게시글 수정
class BoardUpdate(BaseModel):
    title: str
    cont: str

# 게시글 
class boardInfo(BaseModel) :
    title : str
    content : str
    writer : str

# 1. 토큰 생성 함수
def set_token(user_id: str, name: str, email: str, pwd: str, gender: str):
    try:
        iat = datetime.now(timezone.utc)
        exp = iat + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        payload = {
            "user_id": user_id,
            "name": name,
            "email": email,
            "pwd": pwd,
            "gender": gender,
            "iss": "team3",
            "iat": iat,
            "exp": exp
        }
        return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    except JWTError as e:
        print(f"JWT 생성 에러 : {e}")
        return None

# 2. 회원가입 API
@app.post("/signup")
def signup(data: userInfo, response: Response):
    user_id = uuid.uuid4().hex
    sql_insert = f"""
        INSERT INTO user (user_id, name, email, pwd, gender)
        VALUES ('{user_id}', '{data.name}', '{data.email}', '{data.pwd}', '{data.gender}')
    """
    if save(sql_insert):
        sql_select = f"SELECT * FROM user where user_id = '{user_id}'"
        user_select = findOne(sql_select)

        if user_select:
            user_token = set_token(
                user_select['user_id'],
                user_select['name'],
                user_select['email'],
                user_select['pwd'],
                user_select['gender']
            )
            return {"status": True, "user_id": user_select['user_id'], "access_token": user_token}
    return {"status": False, "message": "회원가입 실패"}

# 2.5 ㅋㅋ
def get_current_user(token: str = Cookie(None)):
    if not token:
        raise HTTPException(status_code=401, detail="로그인이 필요합니다")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="토큰이 유효하지 않거나 만료되었습니다")

# 3. 로그인 API (기존 윤주님 로직을 팀원분 스타일로 변경)
@app.post("/login")
async def login(user_data: dict):
    email = user_data.get('email')
    pwd = user_data.get('pwd')
    
    # 1. DB에서 사용자 정보 찾기
    sql = f"SELECT * FROM user WHERE email = '{email}' AND pwd = '{pwd}'"
    user = findOne(sql)
    
    if user:
        # 2. ★중요: user_id를 새로 생성(uuid.uuid4)하지 않고, 
        # DB에서 불러온 user['user_id']를 그대로 사용합니다.
        user_token = set_token(
            user['user_id'],  # DB의 UUID
            user['name'],
            user['email'],
            user['pwd'],
            user['gender']
        )
        
        return {
            "status": True, 
            "access_token": user_token,
            "name": user['name'],
            "user_id": user['user_id']
        }
    else:
        raise HTTPException(status_code=401, detail="이메일 또는 비밀번호가 틀렸습니다.")
    
# 4. 게시판 리스트 API (Main.jsx 연동)
@app.get("/board")
async def get_board_list():
    # 작성자 이름을 보여주기 위해 조인 사용
    sql = """
        SELECT b.no, b.title, u.name, b.regDate 
        FROM edu.board b 
        JOIN edu.user u ON b.user_no = u.no 
        WHERE b.delYn = 0 
        ORDER BY b.no DESC
    """
    result = findAll(sql)
    return result # Main.jsx에서 Array.isArray로 확인하므로 바로 리스트 반환

# 5. 게시글 상세조회 API (Board_view.jsx 연동)
@app.get("/board/{no}")
def get_board(no: int):
    sql = f"""
        SELECT b.no, b.title, u.name, b.cont, b.regDate
        FROM board b
        JOIN user u ON b.user_no = u.no
        WHERE b.no = {no}
    """
    post = findOne(sql)
    if not post:
        return {"status": False, "message": "게시글이 없습니다."}
    return {"status": True, "data": post}

# 게시글 수정
@app.post("/board/update/{no}")
def update_board(no: int, data: BoardUpdate, user: dict = Depends(get_current_user)):
    # 1. DB에서 게시글 정보를 가져올 때 writer(UUID)를 꼭 포함하세요.
    post = findOne(f"SELECT no, writer FROM board WHERE no = {no} AND delYn=0")
    
    if not post:
        raise HTTPException(status_code=404, detail="게시글이 없습니다.")
    
    # 2. ★중요: DB의 writer(UUID)와 토큰의 user_id(UUID)를 비교합니다.
    # 토큰에 담긴 user_id가 DB의 writer와 일치해야 통과됩니다.
    if str(post["writer"]) != str(user["user_id"]):
        raise HTTPException(status_code=403, detail="작성자가 아닙니다.")
    
    # 3. 수정 처리
    sql = f"UPDATE board SET title = '{data.title}', cont = '{data.cont}' WHERE no = {no}"
    if save(sql):
        return {"success": True, "message": "수정 완료"}
    return {"success": False, "message": "수정 실패"}

# 게시글 삭제
@app.delete("/board/{no}")
def delete_board(no: int, user: dict = Depends(get_current_user)):
    # 게시글 존재 확인
    post = findOne(f"SELECT no, user_no FROM edu.board WHERE no = {no} AND delYn='N'")
    if not post:
        raise HTTPException(status_code=404, detail="게시글이 없습니다.")
    # 작성자 확인
    if str(post["user_no"]) != str(user["user_id"]):
        raise HTTPException(status_code=403, detail="작성자가 아닙니다.")
    # 실제 삭제 (soft delete)
    sql = f"UPDATE edu.board SET delYn='Y' WHERE no = {no}"
    if save(sql):
        return {"success": True, "message": "게시글이 삭제되었습니다."}
    else:
        return {"success": False, "message": "삭제 실패"}

# 게시글 추가
@app.post("/boardadd")
def board_add(data: boardInfo) :
    sql_select = f"SELECT no FROM user WHERE user_id = '{data.writer}'"
    user_select = findOne(sql_select)

    if user_select :
        find_user_no = user_select['no']
        sql_insert = f"""
                        INSERT INTO board (title, cont, writer, user_no)
                        VALUES ('{data.title}', '{data.content}', '{data.writer}', {find_user_no})
                    """
        print(find_user_no)
        if save(sql_insert) :
            return {"status" : True, "message" : "게시글 등록 성공"}
    return {"status" : False, "message" : "게시물 등록 실패"}

# 사용자 불러오기
@app.post("/selUser")
def usrt_delYn(request: Request):
  selectUser = request.cookies.get("selectUser")
  if not selectUser:
    return {"status": False, "msg": "회원정보를 불러오는데 실패하였습니다."}
  
  selectUser = base64Decode(selectUser)
  decoded = urllib.parse.unquote(selectUser)
  data = json.loads(decoded)
  sql =f"SELECT `no`,`name`,`email`,`pwd`,`gender`,`regDate`,`modDate`,`user_id` FROM `edu`.`user` WHERE `email` = '{data["email"]}' AND `user_id` = '{data["user_id"]}'"
  if data: 
    data = findOne(sql)
    print(data)
  return {"status":data}

# 사용자 지우기
@app.post("/userDelYn")
def usrt_delYn(request: Request):
  userInfo = request.cookies.get("userInfo")
  if not userInfo:
    return {"status": False, "msg": "탈퇴에 실패하였습니다."}
  
  userInfo = base64Decode(userInfo)
  decoded = urllib.parse.unquote(userInfo)
  data = json.loads(decoded)
  sql =f"UPDATE edu.user SET `delYn` = {data["delYn"]} WHERE `no` = {data["no"]} AND `user_id` = {data["user_id"]}"
  print(sql)
  if data: 
    save(sql)
  print(data)
  return {"status":data, "msg": "탈퇴 되었습니다.\n감사합니다. 안녕히 가십시오."}

def base64Decode(data):
  encoded = urllib.parse.unquote(data)
  return base64.b64decode(encoded).decode("utf-8")