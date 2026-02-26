import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Page1 from '@pages/Page1.jsx';
import Page2 from '@pages/Page2.jsx';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component : Page1
    },
    {
      path: "/page2",
      Component : Page2
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router
