import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router";
import ChatUI from "@pages/ChatUI.jsx";

const Home = () => {
  return (
    <div className="text-center">
      <h1>메인 화면입니다.</h1>
    </div>
  )
}

const NotFound = () => {
  return (
    <div className="text-center">
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
    </div>
  )
}

const App = () => {
  const paths = [
    {path: "/home", element: <Home />},
    {path: "*", element: <NotFound />},
    {path: "/", element: <ChatUI />},
  ]
  return (
    <>
      
        <Routes>
          { paths?.map((v, i) => <Route key={i} path={v.path} element={v.element} />) }
        </Routes>
      
    </>
  )
}

export default App