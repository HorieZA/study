import { useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { api } from "@utils/network"
import Cookies from "js-cookie"

const Board_view = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [board, setBoard] = useState({title: "", name: "", cont: "", no: null})
    const onsubmit = e =>{
        e.preventDefault()
        console.log("")
    }
    const goEdit = (boardId) => {
    // 숫자 boardId를 객체로 감싸서 문자열화 후 Base64 인코딩
    Cookies.set("boardNo", btoa(JSON.stringify({ no: boardId })))
    navigate("/board_edit")
    }

    const delet = () => {
        api.delete(`/board/${board.no}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(res => {
        if (res.data.success) {
            alert("삭제 완료")
            navigate("/")
        } else {
            alert("삭제 실패: " + res.data.message)
        }
    })
    .catch(err => {
        console.error(err)
        alert("서버 요청 중 오류가 발생했습니다")
    })
    }
    useEffect(() => {
    if (!state?.no) {
      alert("잘못된 접근입니다")
      navigate("/")
      return
    }
    api.get(`/board/${state.no}`)
      .then(res => {
        if (res.data.status) {
          setBoard(res.data.data)
        }
      })
  }, [])

    return(
        <div className="container mt-3">
			<h1 className="display-1 text-center">게시글 상세</h1>
			<form onSubmit={onsubmit}>
				<div className="mb-3 mt-3">
					<label htmlFor="title" className="form-label">제목</label>
					<input type="text" className="form-control" id="title" name="title" value={board.title} readOnly="readonly"/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">작성자</label>
					<input type="text" className="form-control" id="name" name="name" value={board.name} readOnly="readonly"/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="content" className="form-label">내용</label>
					<textarea type="text" className="form-control h-50" rows="10" id="content" value={board.cont} name="content" readOnly="readonly"></textarea>
				</div>
			<div className="d-flex">
				<div className="p-2 flex-fill d-grid">
					<button type="button" onClick={()=>goEdit(board.no)} className="btn btn-primary">수정</button>
				</div>
				<div className="p-2 flex-fill d-grid">
					<button onClick={delet} className="btn btn-primary">삭제</button>
                    {/* 삭제로직과 연결 */}
				</div>
				<div className="p-2 flex-fill d-grid">
					<button onClick={() => navigate(-1)} className="btn btn-primary">취소</button>
				</div>
			</div>
			</form>
		</div>
    )
}
export default Board_view