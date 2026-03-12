// 주석 : router 방식
// 주석 외 : router 방식은 맞는데 W3School에도 있는것

// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
import { BrowserRouter, Routes, Route } from "react-router";
import Page1 from '@pages/Page1.jsx';
import Page2 from '@pages/Page2.jsx';
import Page3 from '@pages/Page3.jsx';
import Page4 from '@pages/Page4.jsx';
import Page5 from '@pages/Page5.jsx';

const Router = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     Component : Page1
  //   },
  //   {
  //     path: "/page2",
  //     Component : Page2
  //   },
  //   {
  //     path: "/page3",
  //     Component : Page3
  //   },
  //   {
  //     path: "/page4",
  //     Component : Page4
  //   },
  //   {
  //     path: "/page5",
  //     Component : Page5
  //   },
  // ]);

  // return (
  //   <>
  //     <RouterProvider router={router} />
  //   </>
  // )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
