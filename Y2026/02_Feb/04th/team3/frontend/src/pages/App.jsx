import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../hooks/AuthProvider.jsx';
import Main from "@pages/Main.jsx";
import Login from "@pages/Login.jsx";
import Signup from "@pages/Signup.jsx";
import Nav from "@pages/Nav.jsx";
import Board_view from "@pages/board_view.jsx";
import Board_Edit from "@pages/Board_Edit.jsx";
import BoardAdd from "@pages/BoardAdd.jsx";
import UserEdit from "@pages/UserEdit.jsx";
import UserView from "@pages/UserView.jsx";

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
    {path: "/login", element: <Login />},
    {path: "/", element: <Main />},
    {path: "/board_view", element: <Board_view />},
    {path: "/board_edit", element: <Board_Edit />},
    {path: "/boardAdd", element: <BoardAdd />},
    {path: "/userEdit", element: <UserEdit />},
    {path: "/UserView", element: <UserView />},
    {path: "*", element: <NotFound />},
    {path: "signup", element: <Signup />},
  ]
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Nav />
          <Routes>
            { paths?.map((v, i) => <Route key={i} path={v.path} element={v.element} />) }
          </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App