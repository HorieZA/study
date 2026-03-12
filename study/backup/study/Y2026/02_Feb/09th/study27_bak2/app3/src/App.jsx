import { useState } from 'react'
import axios from "axios"

function App() {
  const [token, setToken] = useState("")
  const event1 = e => {
    e.preventDefault()
    console.log("코드 발급", e.target.email.value)
    axios.post(import.meta.env.VITE_APP_FASTAPT_LOGIN, {"email": e.target.email.value})
    .then(res => {
      console.log(res)
      if(res.data.status) {
        e.target.email.value = ""
        alert("Email 발급 되었습니다.")
      } else alert("입력하신 Email은 존재하지 않습니다.")
    })
    .catch(err => console.error(err))
  }

  const event2 = e => {
    e.preventDefault()
    console.log("토큰 발급", e.target.code.value)
    axios.post(import.meta.env.VITE_APP_FASTAPT_CODE, {"id": e.target.code.value})
    .then(res => {
      console.log(res)
      if(res.data.status) {
        setToken(res.data.access_token)
        alert("토큰 발급 되었습니다.")
      } else alert("입력하신 토큰은 존재하지 않습니다.")
      e.target.code.value = ""
    })
    .catch(err => console.error(err))
  }

  const event3 = () => {
    console.log("사용자 정보 요청")
    axios.post(import.meta.env.VITE_APP_FASTAPT_ME, {}, 
      {headers: {"Authorization": `Bearer ${token}`}} // header로 보내는 방식
    ).then(res => console.log(res))
    .catch(err => console.error(err))
  }
 
  return (
    <>
    <form onSubmit={event1}>
      <input type="email" name="email" required autoComplete="off" />
      <button type="submit">코드 발급</button>
    </form>
    <hr/>
    <form onSubmit={event2}>
      <input type="text" name="code" required autoComplete="off" />
      <button type="submit">토큰 발급</button>
    </form>
    <hr/>
    <button type="button" onClick={event3}>사용자 정보</button>
    </>
  )
}

export default App
