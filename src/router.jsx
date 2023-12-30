import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./components/Layout.jsx";
import Recipe from "./pages/Recipe.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MyFavorites from "./pages/MyFavorites.jsx";
import Settings from "./pages/Settings.jsx";

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
        path: '/user/',
        children: [
          {
            path: '/user/favorites',
            element: <MyFavorites/>
          },
          {
            path: '/user/settings',
            element: <Settings/>
          }
        ]
      }
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
