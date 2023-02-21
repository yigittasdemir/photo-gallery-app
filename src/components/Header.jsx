import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../firebase";
import { logout as logoutHandle } from "../store/auth";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true,
    });
  };

  return (
    <div>
      <nav className="bg-white w-5/6 mx-auto border-b-2 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img
              src="/photo-gallery-logo.png"
              className="h-12 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
              Photo Gallery
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col mt-4 items-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  className="text-white py-2.5 px-6 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500"
                  to="/"
                >
                  Anasayfa
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="text-white  py-2 px-6 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500"
                  onClick={handleLogout}
                >
                  Çıkış yap
                </button>
              </li>
              <div className="text-center relative items-center mx-auto">
                <Link to="/settings">
                  {user.photoURL ? (
                    <img
                      className="h-12 w-12 rounded-full m-auto object-cover bg-center"
                      src={user.photoURL}
                      alt="user-img"
                    />
                  ) : (
                    <div className="block text-center justify-center relative">
                      <img
                        className="h-12 w-12 bg-slate-400 object-cover rounded-full bg-center m-auto"
                        src="/avatar.webp"
                        alt="avatar"
                      />
                    </div>
                  )}
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
