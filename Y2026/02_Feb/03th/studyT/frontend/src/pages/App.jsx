import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from '@pages/NotFound.jsx'
import UserView from '@pages/UserView.jsx'
import UserEdit from '@pages/UserEdit.jsx'

const Home = () => {
  return (
    <div className="text-center">
      <h1>메인 화면입니다.</h1>
      <div className="p-2 flex-fill d-grid">
				<a href="/user_view" className="btn btn-primary">회원 정보 상세</a>
			</div>
      <div className="p-2 flex-fill d-grid">
				<a href="/user_edit" className="btn btn-primary">회원 정보 수정</a>
			</div>
    </div>
  )
}


const App = () => {
  const paths = [
    {path: "/", element: <Home />},
    {path: "/user_view", element: <UserView />},
    {path: "/user_edit", element: <UserEdit />},
    {path: "*", element: <NotFound />},
  ]
  return (
    <>
      <BrowserRouter>
        <Routes>
          { paths?.map((v, i) => <Route key={i} path={v.path} element={v.element} />) }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App