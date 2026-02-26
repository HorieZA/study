import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Page1 from '@pages/Page1.jsx';
import Page2 from '@pages/Page2.jsx';
import Page3 from '@pages/Page3.jsx';
import Page4 from '@pages/Page4.jsx';
import Page5 from '@pages/Page5.jsx';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component : Page1
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router
