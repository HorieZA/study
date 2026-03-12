import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { list } from "@/data.js"

const SignIn = () => {
  const navigate = useNavigate()
  const close = () => navigate("/")
  const [arrs, setArrs] = useState([])
  const [email, setEamil] = useState("")
  const [pwd, setPwd] = useState("")

  const onSubmit = e => {
    e.preventDefault()
    const user = { email, pwd }
    
    // let login = list.find( i => i.email === user.email && i.pwd === user.pwd)
    
    // if(login) {
    //   console.log(`${login.name}님 환영합니다.`)
    // } else {
    //   console.log("로그인에 실패하였습니다.")
    // }

    const arr = list.filter(row => (row.email === user.email && row.pwd === user.pwd));
    
    if(arr.length > 0) {
      console.log(`${arr[0].name}님 환영합니다.`)
    } else {
      console.log("로그인 실패 하였습니다.")
    }
  }

  return (
    <>
      <h1 className="text-center bg-success text-dark bg-opacity-50">SignIn</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email"
            name="email" required onChange={e => setEamil(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" placeholder="Enter password"
            name="pswd" required onChange={e => setPwd(e.target.value)} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button type="submit" className="btn btn-warning">SignIn</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <a href="/signUp" className="btn btn-primary">SignUp</a>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button className="btn btn-danger" onClick={close}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default SignIn