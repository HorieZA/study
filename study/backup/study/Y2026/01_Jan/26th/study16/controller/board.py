from fastapi import APIRouter


# prefix를 사용하여 아래에 "/"를 "" 변경하면 prefix에서 관리할 수 있다.
router = APIRouter(prefix="/board", tags=["게시판"])

# 조회
@router.get("")
def board():
    return {"Hello": "World"}

# 등록
@router.post("")
def board():
    return {"Hello": "World"}

# 수정
@router.put("")
def board():
    return {"Hello": "World"}

# 삭제
@router.delete("")
def board():
    return {"Hello": "World"}