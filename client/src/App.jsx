import { useState } from "react";
import "../src/App.css";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Brand from "./components/getbrand/Brand";
import Add from "./components/addbrand/Add";
import Update from "./components/updatebrand/Update";
import Login from "./components/login/Login";
import { Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);// isLoggedIn function check authentication

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Brand onLogout={handleLogout} isLoggedIn={isLoggedIn} />,
    },
    {
      path: "/add",
      element: <PrivateRoutee isLoggedIn={isLoggedIn} />,
    },
    {
      path: "/update/:id",
      element: <PrivateRoute isLoggedIn={isLoggedIn} />,
    },
    {
      path: "/login",
    
      element: <Login onLogin={handleLogin} />,
    },
  ]);

  function PrivateRoutee({ isLoggedIn }) {
    return isLoggedIn ? <Add /> : <Navigate to="/login" />;
  }
  function PrivateRoute({ isLoggedIn }) {
    return isLoggedIn ? <Update /> : <Navigate to="/login" />;
  }

  return (
    <div>
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
