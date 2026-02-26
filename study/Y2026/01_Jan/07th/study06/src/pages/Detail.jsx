import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
// data.js 파일의 list 배열을 사용한다는 선언
import { list } from "@/data.js"

const Detail = () => {
  const navigate = useNavigate()
  const params = useParams()
  const close = () => navigate("/")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [accept, setAccept] = useState(0)
  const [inEdit, setInEdit] = useState(true)

  const onSubmit = e => {
    e.preventDefault()
    // inEdit가 false인 경우 리턴 하고 true이면 데이터를 저장
    if (!inEdit) return
    const data = { title, content, accept }
    console.log(data)
  }

  useEffect(() => {
    // 선언된 data.js 파일의 list 배열 N번째 인덱스의 객체를 data에 저장하여, 값이 없으면 목록으로 이동하고, 있으면 각 값에 각각 저장 
    const data = list[params.id]
    if (data === undefined) return close()
    setTitle(data?.title)
    setContent(data?.content)
    setAccept(data?.accept)
  }, [])

  return (
    <div className="container mt-3">
      <h1 className="text-center bg-success text-dark bg-opacity-50">DETAIL</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" placeholder="Enter title"
            name="title" required autoComplete="off" value={title} readOnly={inEdit} />
          {/* inEdit가 true이면 readOnly를 true로 설정 하고 inEdit가 false이면 readOnly를 false로 변경 */}
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <input type="text" className="form-control" id="content" placeholder="Enter content"
            name="content" autoComplete="off" value={content} readOnly={inEdit} />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary me-md-2" type="submit" onClick={() => setInEdit(!inEdit)}>{inEdit ? "수정" : "저장"}</button>
          {/* inEdit가 false이면 수정/저장 버튼을 수정 버튼으로 변경 하고 inEdit가 true이면 수정/저장 버튼을 저장 버튼으로 변경 */}
          {
            // accept의 값이 1인 경우 승인/미승인 버튼을 승인 버튼으로 변경 하고, accept가 1이 아니면 승인/미승인 버튼을 미승인 버튼으로 변경
            (accept === 1) ?
              <button className="btn btn-warning" type="button" onClick={() => setAccept(0)}>미승인</button> :
              <button className="btn btn-success" type="button" onClick={() => setAccept(1)}>승인</button>
          }
          <button className="btn btn-secondary" type="button" onClick={close}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default Detail