import { Link, useSearchParams, useNavigate } from "react-router-dom";
import botOpenImg from "../assets/botOpen.png";
import { useLogout, useUser } from "../hooks/auth.js";
import { UserIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

export default function Navbar() {

  const navigate = useNavigate();
  const { data, isPending } = useUser();
  const { mutate: logout } = useLogout();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  const onSearchDebounced = useMemo(() => {
    return debounce((value) => {
      let s = undefined;
      if (value) {
        s = { search: value.trim() };
      }
      setSearchParams(s, { replace: true });
    }, 1000);
  }, []);

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
          <li onClick={() => navigate("/profile")}>
            <a className="justify-between">
              Profile
              <div className="badge badge-secondary">New</div>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button onClick={() => logout()}>Logout</button>
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
            onChange={(e) => {
              setSearch(e.target.value);
              onSearchDebounced(e.target.value);
            }}
          />
        </div>
      </form>
      {renderUserMenu()}
    </nav>
  );
}
