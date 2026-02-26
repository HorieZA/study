from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from db import findOne, findAll, save
import mariadb
import uuid

# 토큰 생성시 필요한 IMPORT
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

# 토큰 생성시 필요한 조건
SECRET_KEY = "your-extremely-secure-random-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

origins = ["http://localhost:5173"]

app = FastAPI()


class LoginModel(BaseModel):
    email: str = Field(..., title="이메일", description="이메일을 받아오는 부분입니다.")
    pwd: str = Field(..., title="비밀번호", description="비밀번호를 받아오는 부분입니다.")


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": True, "result": ["성공 하였소\n모르셨소?\n알아야하오!!"]}


@app.post("/login")
def read_root(model: LoginModel):
    sql = f"""SELECT `no`, `name` FROM edu.user 
        WHERE `delYn` = 0 
          AND `email` = '{model.email}' 
          AND `pwd` = '{model.pwd}'
        """
    data = findOne(sql)
    # print(model)
    if data:
        # access_token = set_token(data["no"],data["name"])
        # print(data)
        # return {"status": True, "model": model, "access_token":access_token}
        # return {"status": True, "model": model}
        id = uuid.uuid4().hex
        token = set_token(data["no"], data["name"])
        print(id, token)
        sql = f"INSERT INTO edu.`login` (`id`, `userNo`, `token`) VALUE ('{id}', {data["no"]}, '{token}')"
        if save(sql):
            return { "status": True, "access_token": id }
    else:
        return {"status": False}


# 프론트 연동 확인용
# @app.post("/login")
# def read_root(model: LoginModel):
#     print(model)
#     return {"status": True, "model": model}


# 토큰 생성 샘플
def set_token(no: int, name: int):
    try:
        # ".utc" 영국시간?
        iat = datetime.now(timezone.utc) + (timedelta(hours=7))
        exp = iat + (timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        # iss: 토큰 발급자(issuer)
        # sub: 토큰 제목(subject), 제목/사용자 (문자열로 작성 필수)
        # aud: 토큰 대상자(audience)
        # iat: 토큰 발급 시간(issued at), 토큰 발급 이후의 경과 시간을 알 수 있음
        # nbf: 토큰 활성 날짜(not before), 이 날이 지나기 전의 토큰은 활성화되지 않음
        # exp: 토큰 만료 시간(expiration), NumericDate 형식으로 되어 있어야 함 ex) 1480849147370
        # jti: JWT 토큰 식별자(JWT ID), 중복 방지를 위해 사용하며, 일회용 토큰(Access Token) 등에 사용
        # 단, 다른 조건도 넣을수 있다.
        data = {
            "no": str(no),      # 다른 조건 테스트1
            "name": name,       # 다른 조건 테스트2
            "iss": "EDU",       # "iss": 발급자
            "sub": str(no),    # "sub": 제목/사용자
            "iat": iat,         # "iat": 발급 시간
            "exp": exp          # "exp": 만료 시간
            }
        return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    except JWTError as j:
        print(f"JWT ERROR : {j}")
        return None
    
@app.post("/token")
def token():
    try:
        result = set_token(3)
        return {"status": True, "token": result}
    except JWTError as j:
        print(f"JWT ERROR : {j}")
        return { "status": False }


# 토큰 인증만 한 상태의 코드 샘플
# @app.post("/token")
# def token():
#    try:
#       data = {}
#       result = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
#       return {"status": True, "token":result}
#    except JWTError as j:
#       print(f"JWT ERROR : {j}")
#    return {"status": False}

@app.get("/key")
def key():
    sql = f"""SELECT `no`, `name` FROM edu.user
        WHERE `delYn` = 0 
          AND `email` = '123@1524351' 
          AND `pwd` = '456'
        """
    data = findOne(sql)
    print(data)
    if data:
        id = uuid.uuid4().hex
        token = set_token(data["no"], data["name"])
        print(id, token)
        sql = f"INSERT INTO edu.`login` (`id`, `userNo`, `token`) VALUE ('{id}', {data["no"]}, '{token}')"
        if save(sql):
            return { "status": True, "access_token": id }
    return { "status": False }