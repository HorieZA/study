import { useState } from "react"
import { useNavigate } from 'react-router'

const ParentComponent = () => {
  return (
    <div>
      <Input type="text" placeholder="이름을 입력하세요" />
      <Input type="email" placeholder="이메일를 입력하세요" />
      <Input type="password" placeholder="비밀번호를 입력하세요" />
    </div>
  );
}

// const Input = ( props, {type, placeholder} ) => <input type={type} placeholder={placeholder} className="form-control" value={props.value} onChange={e => props.setValue(e.target.value)} />
const Input = props => <input className="form-control" value={props.value} onChange={e => props.setValue(e.target.value)} />
const InputR = props => <input type="radio" name="gender" className="form-check-input" checked={props.gender} value={props.value} onChange={e => props.setValue(e.target.value)} />
const Button = props => <button type="button" className="btn btn-primary" onClick={props.event}>생성</button>

const Page3 = () => {
  // 취소 버튼 선언
  const navigate =  useNavigate()
  const onclick = () => navigate("/")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [gender, setGender] = useState(true)
  const checkBoolean = (name, value) => {
    console.log(`checkBoolean 넌 누구? : ${value}`)
    if(name === "gender") return value === "1" ? true : false
    console.log(`checkBoolean if 넌 누구? : ${value}`)
    return value
  }
  console.log({name, email, pwd, gender})
  
  const event = () => {
    const data = { name, email, pwd, gender }
    console.log(`event 넌 누구? : ${gender}`)
    console.log(`event 넌 누구? : ${gender.value}`)
    // setGender(checkBoolean(gender.gender, gender.num.value))
    setGender({...data, [name]: checkBoolean(name, value)})
    // setGender({[gender]: checkBoolean(gender, value)})
    console.log(data)
  }

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">사용자 등록</h1>
      <form >
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">이름:</label>
          <Input type="text" placeholder="이름를 입력하세요." value={name} setValue={setName} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">이메일:</label>
          <Input type="email" placeholder="이메일를 입력하세요." value={email} setValue={setEmail} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">비밀번호:</label>
          <Input type="password" placeholder="비밀번호를 입력하세요." value={pwd} setValue={setPwd} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
            <InputR type="radio" id="radio1" value={gender} setValue={setGender}/>남성
            <label className="form-check-label" htmlFor="radio1"></label>
          </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
            <InputR type="radio" id="radio2" value={gender} setValue={setGender}/>여성
            <label className="form-check-label" htmlFor="radio2"></label>
          </div>
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="flex-fill d-grid">
            <Button event={event} />
          </div>
          <div className="flex-fill d-grid">
            <button className="btn btn-primary" onClick={onclick}>취소</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Page3