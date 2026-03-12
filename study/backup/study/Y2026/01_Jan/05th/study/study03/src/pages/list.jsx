import { useNavigate } from "react-router"

const List = () => {
  const navigate = useNavigate()
  const onclickNew = () => navigate('new')
  const onclick = data => navigate('detail', { state: data }) 
  const arr = [
    { key: 1, name: "스티븐", email: "jobs@shellfolder.com", regDate: "2023-02-28", pwd: "1", gender: true },
    { key: 2, name: "에브릴", email: "lavigne@shellfolder.com", regDate: "2023-02-27", pwd: "2", gender: false },
    { key: 3, name: "남영준", email: "wanyj2002@gmail.com", regDate: "2023-02-24", pwd: "3247", gender: true },
  ]
  const styles = {
    "cursor": "pointer"
  }

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 목록</h1>
      <div className="btn-group">
        <button type="submit" className="btn btn-primary" onClick={() => onclickNew()}>사용자 추가</button>
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
                <tr style={styles} onClick={() => onclick(v)} key={i}>
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