import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./components/Layout.jsx";
import Recipe from "./pages/Recipe.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/recettes/:recipeName",
        element: <Recipe />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
