import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "./Home.jsx";
import App from "../App.jsx";
import Layout from "../components/Layout.jsx";
import Recipe from "./Recipe.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

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
                element: <App />,
            },
            {
                path: "/recettes/:recipeId",
                element: <Recipe />,
            }
        ],
        errorElement: <NotFoundPage />,
    },
],);

export default router;

