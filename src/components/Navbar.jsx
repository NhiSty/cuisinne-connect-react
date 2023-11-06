import useCurrentCustomer from "../hooks/useCurrentCustomer.js";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const { isConnected } = useCurrentCustomer();
    const navigate = useNavigate();

    return (
        <div className="navbar bg-white justify-between">
            <div>
                <a
                    className="btn btn-ghost hover:text-black normal-case text-xl"
                    onClick={() => navigate('/')}
                >
                    EasyCook
                </a>
            </div>
            <div className="w-6/12">
                <div className="form-control w-full">
                    <input type="text" placeholder="Search" className="input bg-white input-bordered md:w-auto h-9" />
                </div>
            </div>
            {
                isConnected ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {/*<img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />*/}
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="btn bg-gray-800 text-white hover:text-black"
                    >
                        Se connecter
                    </button>
                )
            }
        </div>
    )
}
