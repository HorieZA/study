// 주석 : router 방식
// 주석 외 : router 방식은 맞는데 W3School에도 있는것

// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "@pages/NotFound.jsx"
import List from '@pages/list.jsx';
import Select from '@pages/select.jsx';
import Create from '@pages/create.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/detail' element={<Select />} />
        <Route path='/new' element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
