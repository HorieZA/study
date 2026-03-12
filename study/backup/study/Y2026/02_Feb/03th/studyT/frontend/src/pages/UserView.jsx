import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router"
import { useCookies } from "react-cookie"
import axios from "axios"

const UserView = () => {
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
  const [userId, setUserId] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo'])

  const resignation = () => {
    const userDelYn = true
    console.log(no, userDelYn)

    const userInfo = {
      no: no,
      delYn: userDelYn,
    }
    // 쿠키 저장
    setCookie("userInfo", window.btoa(encodeURI(JSON.stringify(userInfo))))
    
    // 서버에 저장 요청
    axios.post("http://localhost:8000/userDelYn",{}, { withCredentials: true } )
      .then(res => alert(res.data.msg))
      .catch(err => console.error(err));
  }

  const submitE = e => {
    e.preventDefault()
    const params = { no, name, email, pwd, gender, regDate, modDate, userId }
    console.log(params)
    navigate("/user_edit", {state:params})
  }

  // 더미코드이므로 화면 연결시 해당 코드는 삭제 또는 주석 처리 부탁드립니다.
  useEffect(()=>{
    // let data = location.state
    // if (data === null) {
    //   data = { no: 2, name: "이나라", email: "123@1524351@56", pwd: "456", gender: false, regDate: "2026-01-22 17:00:15", modDate:"2026-02-03 14:48:22" }
    //   setResult(data)
    // } else {
      const selectUser = {
        email: "doin@g.c",
        user_id: "32bec8fac7cb423f875d2a8e344c80cc",
      }
      // 쿠키 저장
      setCookie("selectUser", window.btoa(encodeURI(JSON.stringify(selectUser))))
      
      axios.post("http://localhost:8000/selUser",{}, { withCredentials: true } )
      .then(res => {
        if (res.data.status) {
          setResult(res.data.status)
        } else {
          alert(res.data.msg)
        }
      })
      .catch(err => console.error(err))
      .finally(() => console.log("완료"));
    // }
  }, [])

  // 더미 코드 삭제 또는 주석 처리시, 해당 코드 주석을 푸셔서 이용하시면 됩니다.
  // 단, 여기서 보내주실때 email과 user_id 값을 보내주셔야 합니다.
  // useEffect(()=>{
  //   const data = location.state
  //   if (data === null) close()
  //   else {
  //     const selectUser = {
  //       email: data.email,
  //       user_id: data.user_id,
  //     }
  //     // 쿠키 저장
  //     setCookie("selectUser", window.btoa(encodeURI(JSON.stringify(selectUser))))
      
  //     axios.post("http://localhost:8000/selUser",{}, { withCredentials: true } )
  //     .then(res => {
  //       if (res.data.status) {
  //         setResult(res.data.status)
  //       } else {
  //         alert(res.data.msg)
  //       }
  //     })
  //     .catch(err => console.error(err))
  //     .finally(() => console.log("완료"));
  //   }
  // }, [])

  const setResult = data => {
    setNo(data.no)
    setName(data.name)
    setEmail(data.email)
    setPwd(data.pwd)
    setGender(data.gender)
    setRegDate(data.regDate)
    setModDate(data.modDate)
    setUserId(userId)
  } 

  return (
    <div className="container mt-3">
      <h1 className="display-1 text-center">회원정보</h1>
      <form onSubmit={submitE}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">이름</label>
          <input type="text" className="form-control" id="name" name="name"
              readOnly="readonly" defaultValue={name} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">이메일</label>
          <input type="email" className="form-control" id="email" name="email"
              readOnly="readonly" defaultValue={email} />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">비밀번호</label>
          <input type="password" className="form-control" id="pwd" name="pwd" 
              readOnly="readonly" defaultValue={pwd} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="regDate" className="form-label">가입일</label>
          <input type="text" className="form-control" id="regDate" name="regDate"
              readOnly="readonly" defaultValue={regDate} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="modDate" className="form-label">회원정보 수정일</label>
          <input type="text" className="form-control" id="modDate" name="modDate"
              readOnly="readonly" defaultValue={modDate} />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio1" name="gender" value="1"
                  checked={gender} disabled readOnly="readonly" />남성
              <label className="form-check-label" htmlFor="radio1"></label>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="radio2" name="gender" value="2"
                  checked={!gender} disabled readOnly="readonly" />여성
              <label className="form-check-label" htmlFor="radio2"></label>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="p-2 flex-fill d-grid">
            <button type="button" className="btn btn-primary" onClick={close}>취소</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button type="submit" className="btn btn-primary">수정</button>
          </div>
          <div className="p-2 flex-fill d-grid">
            <button type="button" className="btn btn-primary" onClick={resignation}>탈퇴</button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default UserView