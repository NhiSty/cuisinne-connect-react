import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router-dom";
import Chatbot from "./Chatbot.jsx";

export default function Layout() {

    return (
        <div className={'w-full min-h-screen'}>
            <div>
                <Navbar />
            </div>
            <div className={'main-content'}>
                <Outlet />
                <Chatbot />
            </div>
        </div>
    )
}
