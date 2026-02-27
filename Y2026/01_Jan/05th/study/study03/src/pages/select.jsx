import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

const Select = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const onclick = () => navigate("/")

  // const [data, setData] = useState({ name: "", email: "", pwd: "", gender: true })
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [gender, setGender] = useState(true)

  useEffect(() => {
    if (location.state === null) return onclick()
    
      // setData(location.state)
    setName(location.state.name)
    setEmail(location.state.email)
    setPwd(location.state.pwd)
    setGender(location.state.gender)
  }, [])

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 정보</h1>
      <form>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">이름 :</label>
          <input type="text" className="form-control" id="name" name="name" readOnly="readonly" defaultValue={name} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">이메일 :</label>
          <input type="email" className="form-control" id="email" name="email" readOnly="readonly" defaultValue={email} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">비밀번호 :</label>
          <input type="password" className="form-control" id="pwd" name="pwd" readOnly="readonly" defaultValue={pwd} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="gender1"
                name="gender" value="1" checked={gender === true} readOnly="readonly" />남성
              <label className="form-check-label" htmlFor="gender1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="gender2"
                name="gender" value="2" checked={gender === false} readOnly="readonly" />여성
              <label className="form-check-label" htmlFor="gender2"></label>
            </div>
          </div>
        </div>
      </form>
      <div className="d-flex gap-2">
      <div className="p-2 flex-fill d-grid">
        <button type="reset" className="btn btn-primary">수정</button>
      </div>
      <div className="p-2 flex-fill d-grid">
        <button type="button" className="btn btn-primary">삭제</button>
      </div>
      <div className="p-2 flex-fill d-grid">
        <button type="button" className="btn btn-primary" onClick={onclick}>취소</button>
      </div>
    </div>
    </div>
  )
}

export default Select