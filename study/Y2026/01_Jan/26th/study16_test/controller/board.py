from fastapi import APIRouter

router = APIRouter(prefix="/board", tags=["게시판"])

@router.get(
    path="", 
    summary=["게시판 목록"] , 
    description = "edu.board 테이블 전체 가져오기"
    )
def user():
    return {"Hello": "게시판 목록"}

@router.post(
    path="", 
    summary=["게시판 등록"] , 
    description = "edu.board 등록하기"
    )
def user():
    return {"Hello": "게시판 등록"}

@router.put(
    path="", 
    summary=["게시판 수정"] , 
    description = "edu.board 수정하기"
    )
def user():
    return {"Hello": "게시판 수정"}

@router.delete(
    path="", 
    summary=["게시판 삭제"] , 
    description = "edu.board 삭제하기"
    )
def user():
    return {"Hello": "게시판 삭제"}