import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import Chatbot from "./Chatbot.jsx";

export default function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="p-5 flex flex-col flex-1">
        <Outlet />
        <Chatbot />
      </div>
    </div>
  );
}
