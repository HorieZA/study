import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router"

const Update = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const close = () => navigate(-1)
  const [user, setUser] = useState({ name: "", email: "", pwd: "", gender: true })

  const checkBoolean = e => setUser(e.target.value === "1" ? { ...user, gender: true } : { ...user, gender: false })

  const onChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const onSubmit = e => {
    e.preventDefault()
    console.dir(user)
    navigate('/detail', { state: user })
  }

  useEffect(() => {
    if (location.state === null) close()
    setUser(location.state)
  }, [])

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 수정</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">이름:</label>
          <input type="text" className="form-control" id="name" placeholder="이름을 입력하세요."
            name="name" readOnly="readonly" value={user.name} onChange={onChange} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">이메일:</label>
          <input type="email" className="form-control" id="email" placeholder="이메일를 입력하세요."
            name="email" value={user.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">비밀번호:</label>
          <input type="password" className="form-control" id="pwd" placeholder="비밀번호를 입력하세요."
            name="pwd" value={user.pwd} onChange={onChange} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio1"
                name="optradio" value="1" checked={user.gender} onChange={checkBoolean} />남성
              <label className="form-check-label" htmlFor="radio1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio2"
                name="optradio" value="2" checked={!user.gender} onChange={checkBoolean} />여성
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