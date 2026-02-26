// 주석 : router 방식
// 주석 외 : router 방식은 맞는데 W3School에도 있는것

import { BrowserRouter, Routes, Route, Link } from 'react-router';
import Page1 from '@pages/Page1.jsx';
import Page2 from '@pages/Page2.jsx';

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router