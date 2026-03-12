import { useNavigate } from "react-router"

const List = () => {
  const navigate = useNavigate()
  const onClickNew = () => navigate("new")
  const onClick = data => navigate("detail", { state: data })

  const arr = [
    { key: 1, name: "스티븐", email: "jobs@shellfolder.com", regDate: "2026-01-06", pwd: "1", gender: true },
    { key: 2, name: "에브릴", email: "lavigne@shellfolder.com", regDate: "2026-01-04", pwd: "2", gender: true },
  ]
  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 목록</h1>
      <div className="btn-group">
        <button type="submit" className="btn btn-primary" onClick={onClickNew}>사용자 추가</button>
      </div>
      <table className="table table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>가입날짜</th>
          </tr>
        </thead>
        <tbody>
          {
            arr.map((v, i) => {
              return (
                <tr className="cursor-pointer" onClick={onClick(v)} key={i}>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.regDate}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
export default List