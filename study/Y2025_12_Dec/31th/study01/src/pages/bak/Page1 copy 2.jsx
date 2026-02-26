import {useNavigate} from 'react-router'

const Page1 = () => {
  let into = 0
  const navigate = useNavigate()

  const onclick = (data) => {
    // console.log(data)
    // 클릭하여 navigate로 해당 페이지로 이동시, state의 값에 파라미터 전달
    navigate("page2", {state: data})
    // navigate({pathname:'page2', state:data})
  }
  
  const styles = {
    "cursor":"pointer"
  }
  
  const arr = [
    { "name":"스티븐", "email":"jobs@shellfolder.com", "regDate":"2023-02-28", "pwd":"1", "gender":true },
    { "name":"에브릴", "email":"lavigne@shellfolder.com", "regDate":"2023-02-27", "pwd":"2", "gender":false },
  ]

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 목록</h1>
      <div className="btn-group">
        <a href="Create.html" className="btn btn-primary">사용자 추가</a>
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
                  <td key={i}>{v.name}</td>
                  <td id='email'>{v.email}</td>
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

export default Page1