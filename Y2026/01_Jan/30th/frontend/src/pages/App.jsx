import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "@pages/NotFound.jsx"
import Nav from "@pages/Nav.jsx"
import Home from "@pages/Home.jsx"
import Login from "@users/Login.jsx"
import Signup from "@users/Signup.jsx"
import UserEdit from "@users/UserEdit.jsx"
import UserView from "@users/UserView.jsx"
import BoardAdd from "@board/BoardAdd.jsx"
import BoardEdit from "@board/BoardEdit.jsx"
import BoardView from "@board/BoardView.jsx"

const App = () => {
  const paths = [
    {path: "/", element: <Home />},
    {path: "*", element: <NotFound />},
    {path: "/login", element: <Login />},
    {path: "/signup", element: <Signup />},
    {path: "/user_edit", element: <UserEdit />},
    {path: "/user_view/:id", element: <UserView />},
    {path: "/board_add", element: <BoardAdd />},
    {path: "/board_edit/:id", element: <BoardEdit />},
    {path: "/board_view/:id", element: <BoardView />},
  ]
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          { paths?.map((v, i) => <Route key={i} path={v.path} element={v.element} />) }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App