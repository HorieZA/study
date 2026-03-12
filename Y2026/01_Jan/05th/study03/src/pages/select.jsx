import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

const Input = props => {
  <div className="mb-3 mt-3">
    <label htmlFor={props.id} className="form-label">{props.name}</label>
    <input type={props.type} className="form-control"
          id={props.id} name={props.id} readOnly="readonly" /> 
          {/* defaultValue={props.data.k} /> */}
  </div>
}

const Select = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const onclick = () => navigate("/")
  const [data, setData] = useState({ name: "", email: "", pwd: "", gender: true })

  useEffect(() => {
    if (location.state === null) return onclick()
    setData(location.state)
  }, [])
  
  const arr = [
    {id: "name", name: "이름", type: "text", onDefV: setData.name},
    {id: "email", name: "이메일", type: "email", onDefV: setData.email},
    {id: "pwd", name: "비밀번호", type: "password", onDefV: setData.pwd}
  ]

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 정보</h1>
      <form>
        {
          arr.map((v, i) => <Input key={i} id={v.id} 
            name={v.name} type={v.type} defaultValue={v.onDefV} />
          )
        }
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio1" name="gender" value="1" checked={data.gender === true} readOnly="readonly" />남성
              <label className="form-check-label" htmlFor="radio1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio2" name="gender" value="2" checked={data.gender === false} readOnly="readonly" />여성
              <label className="form-check-label" htmlFor="radio2"></label>
            </div>
          </div>
        </div>
      </form>
      <div className="d-flex">
        <div className="p-2 flex-fill d-grid">
          <a href="Update.html" className="btn btn-primary">수정</a>
        </div>
        <div className="p-2 flex-fill d-grid">
          <a href="List.html" className="btn btn-primary">삭제</a>
        </div>
        <div className="p-2 flex-fill d-grid">
          <button className="btn btn-primary" onClick={onclick}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default Select