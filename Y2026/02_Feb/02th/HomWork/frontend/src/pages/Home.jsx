import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from 'react'
import axios from "axios";


function Home() {
  
  const [isDark, setIsDark] = useState(false);

  const onCkick = () => {

    axios.get("http://localhost:8000/")
      .then(res => {
        if (res.data.status) {
          alert(res.data.result[0]);
        } else {
          alert("오류 발생");
        }
      })
      .catch(err => console.error(err))
      .finally(() => console.log("완료"));
  }

  const btn1Event = () => {
    console.log("btn1 호출");

    // 배경색 + 텍스트 색 변경
    setIsDark(prev => !prev);
  };

  return (
    <div >
      <div className={`text-center min-vh-100 ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <h1>메인 화면입니다.</h1>
        <br />
        <input type="text" />
        <br />
        <div className="btn-group">
          <button type="button" className="btn btn-success mt-3" onClick={() =>onCkick()}>
            누구냐 넌?
          </button>
          <button type="button" className="btn btn-primary mt-3" onClick={btn1Event}>
            FastAPI 확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;
