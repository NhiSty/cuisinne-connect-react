import { Link, useNavigate } from "react-router-dom";
import 'regenerator-runtime/runtime';
import botOpenImg from "../assets/botOpen.png";
import { useLogout, useUser } from "../hooks/auth.js";
import { UserIcon, Mic } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


export default function Navbar() {
    const { data, isPending } = useUser();
    const { mutate: logout } = useLogout();
    const navigate = useNavigate()
    const { transcript, finalTranscript, listening, resetTranscript } = useSpeechRecognition();
    const [search, setSearch] = useState("");

    const onSearchDebounced = useCallback(() => {
        let value = search.trim();
        if (value) {
            setSearch("")
            return navigate(`/?search=${value}`, { replace: true })
        }
        navigate('/', { replace: true })
    }, [search]);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    const stopListening = async () => {
        await SpeechRecognition.stopListening()

        setSearch(finalTranscript)
        setTimeout(onSearchDebounced, 10)
        resetTranscript();
    };

    useEffect(() => {
        setSearch(transcript)
    }, [transcript]);


    const renderUserMenu = () => {
        if (isPending) {
            return <div className="skeleton w-12 h-12 rounded-full"></div>;
        }

        if (!data) {
            return (
                <Link
                    to="/login"
                    className="btn btn-neutral text-white hover:text-white"
                >
                    Se connecter
                </Link>
            );
        }

        return (
            <div className="dropdown dropdown-end">
                <div
                    role="button"
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                >
                    <UserIcon className="w-6 h-6" />
                </div>

                <ul
                    tabIndex={0}
                    className="dropdown-content mt-3 z-[1] shadow menu menu-sm bg-base-100 rounded-box w-52"
                >
                    <li>
                        <Link to="/user/favorites">
                            Mes favoris
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/settings">Préférences</Link>
                    </li>
                    <li>
                        <button onClick={() => logout()}>Déconnexion</button>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <nav className="navbar bg-white justify-between shadow-sm border-b">
            <div>
                <Link className="btn btn-ghost normal-case text-xl" to="/">
                    <img
                        src={botOpenImg}
                        className="w-10 inline-block mr-2 rounded-full"
                        alt="logo"
                    />
                    EasyCook
                </Link>
            </div>
            <form
                className="w-6/12"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSearchDebounced(search);
                }}
            >
                <div className="form-control w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input bg-white input-bordered md:w-auto h-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={listening ? stopListening : startListening}
                    className={`ml-2 p-2 rounded-full ${listening ? 'text-red-500' : 'text-black'}`}
                >
                    <Mic />
                </button>
            </form>
            {renderUserMenu()}
        </nav>
    );
}
