import '@styles/App.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Page1 from '@pages/Page1.jsx';
import Page2 from '@pages/Page2.jsx';

function App() {
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

export default App
