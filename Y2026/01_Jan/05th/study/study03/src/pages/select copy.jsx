import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

const Input = props => {
  return (
    <div className="mb-3 mt-3">
      <label htmlFor={props.id} className="form-label">{props.name} :</label>
      <input type={props.type} className="form-control"
        id={props.id} name={props.id} readOnly="readonly"
        defaultValue={props.onDefV} />
    </div>
  )
}

const Gender = props => {
  return (
    <div className="d-flex">
      <div className="p-2 flex-fill">
        <div className="form-check">
          <input type="radio" className="form-check-input" id="gender1"
            name={props.id} value="1" checked={props.gender === true} readOnly="readonly" />남성
          <label className="form-check-label" htmlFor="gender1"></label>
        </div>
      </div>
      <div className="p-2 flex-fill">
        <div className="form-check">
          <input type="radio" className="form-check-input" id="gender2"
            name={props.id} value="2" checked={props.gender === false} readOnly="readonly" />여성
          <label className="form-check-label" htmlFor="gender2"></label>
        </div>
      </div>
    </div>
  )
}

const Buttons = props => {
  return (
    <div className="d-flex gap-2">
      <div className="p-2 flex-fill d-grid">
        <button type="sumit" className="btn btn-primary" onClick={props.oclicknew}>수정</button>
      </div>
      <div className="p-2 flex-fill d-grid">
        <button type="reset" className="btn btn-primary">삭제</button>
      </div>
      <div className="p-2 flex-fill d-grid">
        <button type="button" className="btn btn-primary"onClick={props.onclick}>취소</button>
      </div>
    </div>
  )
}

const Select = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const onclick = () => navigate("/")
  const oclicknew = () => navigate("/new")
  const [data, setData] = useState({ name: "", email: "", pwd: "", gender: true })

  useEffect(() => {
    if (location.state === null) return onclick()
    setData(location.state)
  }, [])

  const arr = [
    {
      id: "name", name: "이름", type: "text", desc: "이름을 입력하세요.",
      onDefV: data.name
    },
    {
      id: "email", name: "이메일", type: "email", desc: "이메일를 입력하세요.",
      onDefV: data.email
    },
    {
      id: "pwd", name: "비밀번호", type: "password", desc: "비밀번호를 입력하세요.",
      onDefV: data.pwd
    }
  ]

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 정보</h1>
      <form>
        {
          arr.map((v, i) => <Input key={i} id={v.id}
            name={v.name} type={v.type} onDefV={v.onDefV} />
          )
        }
        <Gender gender={data.gender} />
      </form>
      <Buttons onclick={onclick} oclicknew={oclicknew}/>
    </div>
  )
}

export default Select