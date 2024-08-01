import "../src/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Brand from "./components/getbrand/Brand";
import Add from "./components/addbrand/Add";
import Update from "./components/updatebrand/Update";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Brand />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
