import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router";
import '@styles/App.css'
import Home from '@pages/Home.jsx'
import NotFound from '@pages/NotFound.jsx'
import Login from "@pages/Login";
import Nav from "@pages/Nav";

const App = () => {
  const paths = [
    {path: "/", element: <Home />},
    {path: "*", element: <NotFound />},
    {path: "/login", element: <Login />},
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