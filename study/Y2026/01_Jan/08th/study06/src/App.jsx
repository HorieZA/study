import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router";
import "@/list.css"
import NotFound from "@pages/NotFound.jsx";
import Create from "@pages/Create.jsx";
import Detail from "@pages/Detail.jsx";
import List from "@pages/List.jsx";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">HOME</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/new">Create</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/detail">Detail</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/404">404</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/html/list.html" target="_blank">예시화면1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/html/create.html" target="_blank">예시화면2</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/html/detail.html" target="_blank">예시화면3</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
const Footer = () => {
  const styles = {color: "#7eb047", fontWeight: "bold"}
  return (
    <div className="mt-5 p-4 bg-dark text-white text-center">
      <p>SHELL<span style={styles}>FOLDER</span></p>
    </div>
  )
}
const App = () => {
  const paths = [
    // {path: "/", element: <Create />},
    // {path: "/:id", element: <Detail />},

    {path: "/", element: <List />},
    {path: "/new", element: <Create />},
    {path: "/detail/:id", element: <Detail />},
    {path: "*", element: <NotFound />},
  ]
  return (
    <>
      <Nav />
      <div className="container-fluid mt-3" style={{minHeight: '50vh'}}>
        <BrowserRouter>
          <Routes>
            {
              paths?.map((v, i) => <Route key={i} path={v.path} element={v.element} />)
            }
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  )
}
export default App
