import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

const Update = () => {
  const navigate = useNavigate()
  const close = () => navigate(-1)
  const location = useLocation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [gender, setGender] = useState(true)

  const onSubmit = e => {
    e.preventDefault()
    const data = {name, email, pwd, gender}
    console.log(data)
  }

  useEffect(() => {
    const data = location.state
    if (data === null) return close()
    setName(data?.name)
    setEmail(data?.email)
    setPwd(data?.pwd)
    setGender(data?.gender)
  }, [])

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 수정</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">이름:</label>
          <input type="text" className="form-control" id="name" 
                placeholder="이름을 입력하세요." name="name" readOnly="readonly" 
                value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">이메일:</label>
          <input type="email" className="form-control" id="email" 
                placeholder="이메일를 입력하세요." name="email" 
                value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">비밀번호:</label>
          <input type="password" className="form-control" id="pwd" 
                placeholder="비밀번호를 입력하세요." name="pwd" 
                value={pwd} onChange={e => setPwd(e.target.value)} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio1"
                    name="gender" value="1" checked={gender} 
                    onChange={e => setGender(true)} />남성
              <label className="form-check-label" htmlFor="radio1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio2"
                    name="gender" value="2" checked={!gender} 
                    onChange={e => setGender(false)} />여성
              <label className="form-check-label" htmlFor="radio2"></label>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button className="btn btn-primary" type="submit">저장</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button className="btn btn-primary" type="button" onClick={close}>취소</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Update