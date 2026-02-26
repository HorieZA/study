import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from 'react'
import axios from "axios";

const Home = () => {
  
  const [isDark, setIsDark] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8000/")
    .then(res => {
      if (res.data.status && res.data.result.length > 1) {
        setName(res.data.result[0])
        setIsDark(res.data.result[1] === "dark")
        console.log("저장된 정보를 불러옵니다")
      } else {
        console.log("저장된 정보가 없습니다")
      }
    })
    .catch(err => console.error(err))
    .finally(() => console.log("조회 완료"))
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? "dark" : "light")
  }, [isDark])

  const onClick = () => {
    if (!name) return alert("이름을 입력해주세요!")
    
    const params = {
      name : name,
      theme : isDark ? "dark" : "light"
    }

    axios.get("http://localhost:8000/", params)
      .then(res => {
        if (res.data.status) {
          alert(`${res.data.result[0]}님의 Theme : ${res.data.result[1]}`)
        } else {
          alert("오류 발생")
        }
      })
      .catch(err => console.error(err))
      .finally(() => console.log("완료"))
  }

  const btn1Event = () => {
    setIsDark(prev => !prev);
  }

  return (
    <>
      <div className={`text-center min-vh-100 ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}>
        <br/><br/><br/><br/><br/>
        <h1 className="display-4 fw-bold"> {name ? `'${name}'님 하이염👋🏻` : "누구세용?"} </h1>
        <br />

        <div className="container" style={{ maxWidth: "400px" }}>
          <input 
            type="text" 
            className="form-control form-control-lg text-center shadow-sm" 
            placeholder="이름을 입력하세요" 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
          
          <div className="btn-group mt-4 w-100 shadow">
            <button type="button" className="btn btn-info btn-lg" onClick={onClick}>
              사용자 확인
            </button>
            <button type="button" className="btn btn-warning btn-lg" onClick={btn1Event}>
              색상 변경
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
