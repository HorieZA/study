import { useNavigate, useLocation, useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Cookies from "js-cookie"
import { api } from "@utils/network"

const Board_edit = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [board, setBoard] = useState({ title: "", name: "", cont: "" })
    const [cookies] = useCookies(['accessToken']);

    const onsubmit = async (e) => {
        e.preventDefault()
      const token = cookies.accessToken; 
        console.log("보낼 토큰:", token);

        try {
            const response = await axios.post(
                `http://localhost:8000/board/update/${no}`, 
                { title, cont }, // 보낼 데이터
                { 
                    headers: { 
                        Authorization: `Bearer ${token}` // ★ 이게 꼭 있어야 get_current_user가 작동해요!
                    } 
                }
            );
            if(response.data.success) {
                alert("수정되었습니다.");
                navigate(`/board/${no}`);
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                alert("로그인이 만료되었거나 권한이 없습니다.");
            } else {
                alert("수정 권한이 없습니다.");
            }
        }
    };

    useEffect(() => {
    const boardCookie = Cookies.get("boardNo"); 
    if (!boardCookie) {
        alert("잘못된 접근입니다");
        navigate(-1);
        return;
    }
    let boardNo;
    try {
        boardNo = JSON.parse(atob(boardCookie)).no
    } catch (e) {
        alert("게시글 정보 처리 중 오류 발생");
        navigate(-1);
        return;
    }

    api.get(`/board/${boardNo}`)
        .then(res => {
        if (res.data.status) {
            setBoard(res.data.data);
        }
        })
    }, [])

    return(
        <div className="container mt-3">
			<h1 className="display-1 text-center">게시글 수정</h1>
			<form onSubmit={onsubmit}>
				<div className="mb-3 mt-3">
					<label htmlFor="title" className="form-label">제목</label>
					<input type="text" className="form-control" id="title" placeholder="제목을 입력하세요." name="title"
                    value={board.title} onChange={e => setBoard({...board,title:e.target.value})}/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">작성자</label>
					<input type="text" className="form-control" id="name" value={board.name} 
                    name="name" disabled/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="content" className="form-label">내용</label>
					<textarea type="text" className="form-control h-50" rows="10" placeholder="내용을 입력하세요." name="content"
                    value={board.cont} onChange={e => setBoard({...board,cont:e.target.value})}/>
				</div>
				<div className="d-flex">
					<div className="p-2 flex-fill d-grid">
					    <button type="submit" className="btn btn-primary">저장</button>
					</div>
					<div className="p-2 flex-fill d-grid">
					    <button type="button" onClick={() => navigate(-1)} className="btn btn-primary">취소</button>
					</div>
				</div>
			</form>
		</div>
    )
}

export default Board_edit