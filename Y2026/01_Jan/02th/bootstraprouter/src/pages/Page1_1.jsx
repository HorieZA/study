import { useNavigate } from 'react-router'

const Page1 = () => {

  // console.log(useNavigate()) -> 찍어보면 console에서 'hook'을 알 수 있음(react 기술)
  const navigate = useNavigate(); // 함수생성

  // ==== 스티븐, 에브릴 같은 페이지 이동
  // const onclick = () => {
  //   // "location.href = 'Select.html';"
  //   // location.href : 주소값 바꾸는 것 -> 이대로 써도 되겠지만 우린 router방식으로 GO
  //   navigate("page2") // 함수호출 ("주소값")
  // }

  // ==== 스티븐, 에브릴 각각 다른 페이지 이동
  const onclick = (data) => {
    // const data = arr[index]
    // console.log(data)
    navigate(`page2`, {state: data})
  }

  const arr = [
    { "key":1, "name":"스티븐", "email":"jobs@shellfolder.com", "regDate":"2023-02-28", "pwd" : 1234, "gender" : true }, // 하나만 넣을 수 없어서 object 형식으로 넣음
    { "ket":2, "name":"에브릴", "email":"lavigne@shellfolder.com", "regDate":"2023-02-27", "pwd" : 1234, "gender" : false }, 
  ]
  const styles = { // 이 페이지 안에서만 사용
    "cursor":"pointer"
  }

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

              // 스티븐, 에브릴 같은 페이지 이동
              // <tr style={styles} className = "cursor-pointer" onClick={onclick} key={i}>
              //   <td>{ v.name }</td>
              //   <td>{ v.email }</td>
              //   <td>{ v.regDate }</td>
              // </tr>

              // 스티븐, 에브릴 각각 다른 페이지 이동
              <tr style={styles} className = "cursor-pointer" onClick={()=>onclick(v)} key={i}>
                <td>{ v.name }</td>
                <td>{ v.email }</td>
                <td>{ v.regDate }</td>
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