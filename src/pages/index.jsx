import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "./Home.jsx";
import App from "../App.jsx";
import Layout from "../components/Layout.jsx";

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
        ],
    },
],);

export default router;

