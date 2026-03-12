import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router"
import { useCookies } from "react-cookie"
import axios from "axios"

const UserEdit = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const close = () => navigate(-1)
  const [no, setNo] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [gender, setGender] = useState("")
  const [regDate, setRegDate] = useState("")
  const [modDate, setModDate] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies(['userUp'])
  
  const submitE = e => {
    e.preventDefault()
    const params = { no, name, email, pwd, gender, regDate, modDate }
    console.log(params)

    const userUp = {
      no: no,
      name: name,
      email: email,
      pwd: pwd,
      gender: gender,
      regDate: regDate
    }
    // 쿠키 저장
    setCookie("userUp", window.btoa(encodeURI(JSON.stringify(userUp))))
    // 서버에 저장 요청
    axios.post("http://localhost:8000/userUpdate",{}, { withCredentials: true } )
      .then(res => alert(res.data.msg))
      .catch(err => console.error(err));

    navigate("/UserView", {state:params})
  }

  useEffect(()=>{
    const data = location.state
    if (data === null) return close()
      setResult(data)
  }, [])

  const setResult = data => {
    setNo(data.no)
    setName(data.name)
    setEmail(data.email)
    setPwd(data.pwd)
    setGender(data.gender)
    setRegDate(data.regDate)
    setModDate(data.modDate)
  } 

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">회원정보 수정</h1>
      <form onSubmit={submitE}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">이름</label>
          <input type="text" className="form-control" id="name" placeholder="이름을 입력하세요." name="name"
              value={name} onChange={e=>setName(e.target.value)}  autoComplete='off' required={true} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">이메일</label>
          <input type="email" className="form-control" id="email" placeholder="이메일를 입력하세요." name="email"
              value={email} onChange={e=>setEmail(e.target.value)}  autoComplete='off' required={true} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">비밀번호</label>
          <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요." name="pwd"
              value={pwd} onChange={e=>setPwd(e.target.value)}  autoComplete='off' required={true} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="regDate" className="form-label">가입일</label>
          <input type="text" className="form-control" id="regDate" placeholder="YYYY-MM-DD" name="regDate" 
              disabled readOnly="readonly" defaultValue={regDate}/>
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio1" name="gender" value="1" 
                  checked={gender} onChange={()=>setGender(true)} />남성
              <label className="form-check-label" htmlFor="radio1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio2" name="gender" value="2" 
                  checked={!gender} onChange={()=>setGender(false)} />여성
              <label className="form-check-label" htmlFor="radio2"></label>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button type="submit" className="btn btn-primary">저장</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button type="button" className="btn btn-primary" onClick={close}>취소</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default UserEdit