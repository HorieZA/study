<img src="./images/fastapi-0.png" width="200">

## (1) FastAPI란

- **Starlette**를 기반으로 웹 기능을 제공하고,
- **Pydantic**(현재는 Pydantic v2 + pydantic-core)을 사용해 데이터 검증 및 설정을 자동으로 처리하는 **ASGI(Asynchronous Server Gateway Interface)** 프레임워크입니다.

## (1) 주요 특징

> 1) **정말 빠르다 (High Performance)**

- FastAPI는 Go, Node.js 수준의 높은 성능을 제공합니다.
- 비동기(Async/Await) 네이티브 지원으로 많은 요청을 효율적으로 처리할 수 있습니다.

> 2) **자동 API 문서화 (Swagger / Redoc 자동 생성)**

- FastAPI의 가장 큰 장점 중 하나는 **OpenAPI 기반 문서가 자동 생성**된다는 것!
	- `/docs` → Swagger UI
	- `/redoc` → ReDoc UI

> 3) **타입 힌트 기반의 강력한 유효성 검사**

- Pydantic 모델을 이용해 **입력/출력 데이터 검증**을 자동 처리합니다.
	- JSON body 검증
	- 쿼리 파라미터 검증
	- 응답 모델 검증
	- 스키마 자동 생성

> 4) **비동기 완전 지원**

- Python의 `async def`를 완벽하게 지원합니다.
- 동기와 비동기를 자연스럽게 혼용할 수 있습니다.

> 5) **개발 생산성 극대화**

- 자동 완성(IDE Friendly)
- 간단한 라우팅 구문
- 간편한 의존성 주입(Dependency Injection)

## (2) FastAPI 예제

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello FastAPI!"}
```

> 실행 방법

```
uvicorn main:app --reload
```

- [http://127.0.0.1:8000](http://127.0.0.1:8000)
- [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## (3) 라우팅 예제

> Path Parameter

```python
@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}
```

> Query Parameter

```python
@app.get("/search")
def search(q: str = None, page: int = 1):
    return {"query": q, "page": page}
```

> Request Body with Pydantic

```python
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int

@app.post("/users")
def create_user(user: User):
    return {"user": user}
```

## (4) 의존성 주입(Dependency Injection)

> FastAPI는 매우 간단한 의존성 주입 시스템을 지원합니다.

```python
from fastapi import Depends

def get_token(token: str):
    if token != "secret":
        raise Exception("Invalid token")
    return token

@app.get("/secure")
def secure_endpoint(token: str = Depends(get_token)):
    return {"token": token}
```

## (5) DB 연동

> FastAPI는 ORM을 포함하지 않지만 아래와 쉽게 연동됩니다:

- SQLAlchemy
- Tortoise ORM
- Prisma
- MongoDB (Motor)
- PostgreSQL, MySQL

> 예: SQLAlchemy + Async 예제

```python
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends

async def get_db() -> AsyncSession:
    async with SessionLocal() as session:
        yield session
```

## (6) FastAPI가 주로 사용되는 분야

- REST API 서버
- Microservices
- Machine Learning 모델 Serving(API)
- IoT 백엔드
- 비동기 작업 처리(Background Task)
- 채팅/웹소켓 서비스

> 특히 **AI/ML API 배포**에 자주 쓰입니다.

## (7) 다른 Python 프레임워크와 비교

| 특징 | `FastAPI` | `Flask` | `Django` |
| :---: | :---: | :---: | :---: |
| 성능 | 매우 빠름 | 보통 | 보통 |
| 비동기 지원 | 완전 지원 | 미약 | 일부 |
| 자동 문서화 | O | X | X |
| ORM 포함 | X | X | O |
| 사용 분야 | API 중심 | 가벼운 웹앱 | 대규모 웹서비스 |
| 타입 힌트 기반 | O | X | X |
