import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router'
import { list } from "@/data.js"

const UserEdit = () => {
  const navigate = useNavigate()
  const params = useParams()
  const close = () => navigate("/")
	const [data, setData] = useState({ no: "", name: "", title: "", cont: "" })
  const onClick = () => navigate(`/board_edit/${params.id}`)
	
  useEffect(() => {
    const data = list[params.id]
    if (data == undefined) return close()
		setData(data)
	}, [])

  return (
    <div className="container mt-3">
			<h1 className="display-1 text-center">게시글 상세</h1>
			<form>
				<div className="mb-3 mt-3">
					<label htmlFor="title" className="form-label">제목</label>
					<input type="text" className="form-control" id="title" name="title" disabled readOnly="readonly" value={data?.title} />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="name" className="form-label">작성자</label>
					<input type="text" className="form-control" id="name" name="name" disabled readOnly="readonly" value={data?.name} />
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="content" className="form-label">내용</label>
					<textarea type="text" className="form-control h-50" rows="10" id="content" name="content" disabled readOnly="readonly" value={data?.cont}></textarea>
				</div>
			</form>
			<div className="d-flex">
				<div className="p-2 flex-fill d-grid">
					<button className="btn btn-primary" onClick={()=>onClick()}>수정</button>
				</div>
				<div className="p-2 flex-fill d-grid">
					<button className="btn btn-primary">삭제</button>
				</div>
				<div className="p-2 flex-fill d-grid">
					<button className="btn btn-primary" onClick={()=>close()}>취소</button>
				</div>
			</div>
		</div>
  )
}

export default UserEdit