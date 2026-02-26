import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from "axios"


function Home() {
  const [title, setTitle] = useState("")
  const [mail, setMail] = useState("")
  const [msg, setMsg] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies(['msgInfo'])

  const saveMsg = () => {
    const msgInfo = {
      title: title,
      mail: mail,
      msg: msg,
    }
    // 쿠키 저장
    setCookie("msgInfo", window.btoa(encodeURI(JSON.stringify(msgInfo))), { path: "/" })
    
    // 서버에 저장 요청
    axios.post("http://localhost:8001/pd",{}, { withCredentials: true } )
      .then(res => alert(res.data.msg))
      .catch(err => console.error(err))
      .finally(() => console.log("완료"));
  }

  return (
    <div className={`bg-info min-vh-100 d-flex justify-content-center align-items-center`}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h5 className="mb-3 text-center">너의 메일에 보내고 싶어</h5>

        <div className="mb-3 mt-3">
          <input type="text" className="form-control" id="title" placeholder="이메일 제목을 입력해 주세요."
            name="title" value={title} onChange={e=>setTitle(e.target.value)}/>
          <br/>
          <input type="text" className="form-control" id="mail" placeholder="보내고 싶은 이메일를 입력해 주세요."
            name="mail" value={mail} onChange={e=>setMail(e.target.value)}/>
          <br/>
					<textarea type="text" className="form-control h-50" rows="10" id="msg" placeholder="보내고 싶은 메시지를 작성해 주세요."
            name="msg" value={msg} onChange={e=>setMsg(e.target.value)}></textarea>
				</div>
        <button type="button" className="btn btn-primary mt-3" onClick={saveMsg}>메일 메시지 전송</button>
      </div>
    </div>
  )
}

export default Home;
