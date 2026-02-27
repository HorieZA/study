import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from '@pages/NotFound.jsx'
import Login from '@pages/Login.jsx'
import axios from "axios"

const Home = () => {
  const callEvent = () => {
    console.log("callEvent")
    axios.get("http://localhost:8000/")
      .then(res => {
        console.log(res.data)
        if (res.data.status) {
          alert(res.data.result[0])
        } else {
          alert("공습경보! 공습경보!\n공습경보! 공습경보!")
        }
      })
      .catch(err => console.error(err))
      .finally(() => console.log("성공!! 성공!!"))
  }
  return (
    <div className="text-center">
      <br />
      <br />
      <h1>메인 화면입니다.<br />아마도....</h1>
      <br />
      <br />
      <button type="button" className="btn btn-primary" onClick={callEvent}>성공 시작.. 실패?</button>
      <br />
      <br />
      <a type="button" className="link" href="/login"><h1>로그인 화면</h1></a>
    </div>
  )
}

const App = () => {
  const paths = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ]
  return (
    <>
      <BrowserRouter>
        <Routes>
          {paths?.map((v, i) => <Route key={i} path={v.path} element={v.element} />)}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App