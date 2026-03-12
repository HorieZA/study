from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os # path등 물리적인 파일을 관리할때는 os를 이용한다
# from root import main
# from user import main
# import user
# import board
from controller import user, board, root

def urls():
    return [root.router, user.router, board.router]

app = FastAPI()

# uv run fastapi dev => 개발자 모드이므로 저장 시 자동 반영
# uv run fastapi => 배포용 이므로 저장 시 자동 반영 되지 않음 / 반영을 확인 하기 위해서는 반영(저장) 후 run을 실행해야함

# 정적 파일을 주거나 관리하는 곳이므로 http://127.0.0.1:23306/docs 에서는 보이지 않음
static_dir = os.path.join(os.path.dirname(__file__), "update")
app.mount("/update", StaticFiles(directory = static_dir), name = "update")

# apis = [user.router, board.router]
apis = urls()
for r in apis:
    app.include_router(r)

# app.include_router(main)
# app.include_router(user.router)
# app.include_router(board.router)

# @app.get(path="/")
# def root():
#     return {"Hello": "World"}

# css, html, js등은 update에서 관리하면 안됨 여기는 교육이므로 이렇게 진행

# static_dir = os.path.join(os.path.dirname(__file__), "images")
# app.mount("/images", StaticFiles(directory=static_dir), name="images")

# static_dir = os.path.join(os.path.dirname(__file__), "html")
# app.mount("/html", StaticFiles(directory=static_dir), name="html")

# static_dir = os.path.join(os.path.dirname(__file__), "css")
# app.mount("/css", StaticFiles(directory=static_dir), name="css")

# static_dir = os.path.join(os.path.dirname(__file__), "javascript")
# app.mount("/javascript", StaticFiles(directory=static_dir), name="javascript")


# root.py로 내용 이동
# # 조회
# @app.get("/")
# def read_root():
#     return {"Hello": "World"}
# # 등록
# @app.post("/")
# def read_root():
#     return {"Hello": "World"}
# # 수정
# @app.put("/")
# def read_root():
#     return {"Hello": "World"}
# # 부분수정
# # 현재는 많이 사용하지 않음 
# @app.patch("/")
# def read_root():
#     return {"Hello": "World"}
# # 삭제
# @app.delete("/")
# def read_root():
#     return {"Hello": "World"}

# # 여기에서 이렇게 작성하면 실행이 안됨
# def test():
#     return {"Hello": "World"}

# app.include_router(main)

# 다음과 같이 @app.... 부분 설정이 필요
# 어노테이션 기법
# @app.get("/test")
# def test():
#     return {"Hello": "World"}