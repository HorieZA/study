import { useState } from "react"
import { useNavigate } from "react-router"
import { api } from '../utils/network.js';
import axios from "axios"
import { useAuth } from '../hooks/AuthProvider.jsx';

const BoardAdd = () => {

  const navigate = useNavigate()
  const { user } = useAuth();
  
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const submitBtn = async (e) => {
    e.preventDefault()
    const params = {
      title : title,
      content : content,
      writer : 
    }
    
  try {
          const res = await api.post("/boardadd", params);
          
          if(res.data.status) {
              alert(res.data.message);
              navigate("/"); 
          } else {
              alert(res.data.message);
          }
      } catch (err) {
          console.error("게시글 등록 실패:", err);
          alert("등록 중 오류가 발생했습니다.");
      }
  };
  
  return (
    <div className="container mt-3">
			<h1 className="display-1 text-center">게시글 작성</h1>
			<form onSubmit={submitBtn}>
				<div className="mb-3 mt-3">
					<label htmlFor="title" className="form-label">제목</label>
					<input 
            type="text" 
            className="form-control" 
            id="title" 
            placeholder="제목을 입력하세요." 
            name="title" 
            value={title}
            onChange={e=>setTitle(e.target.value)}
            autoComplete="off" />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="content" className="form-label">내용</label>
					<textarea 
            type="text" 
            className="form-control h-50" 
            rows="10" 
            placeholder="내용을 입력하세요." 
            name="content"
            value={content}
            onChange={e=>setContent(e.target.value)}> 
          </textarea>
				</div>
				<div className="d-flex">
					<div className="p-2 flex-fill d-grid">
						<button type="submit" className="btn btn-primary">등록</button>
					</div>
					<div className="p-2 flex-fill d-grid">
						<button type="button" className="btn btn-primary" onClick={()=>navigate("/")}>취소</button>
					</div>
				</div>
			</form>
		</div>
  )
}

export default BoardAdd