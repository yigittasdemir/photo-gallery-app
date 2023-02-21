import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const myFunction = (e) => {
    var x = document.getElementById("navbar-default");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

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

  if (user) {
    return (
      <div>
        <nav className="bg-white w-5/6 mx-auto border-b-2 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <Link to="/" className="flex items-center">
              <img
                src="/photo-gallery-logo.png"
                className="h-12 mr-3"
                alt="logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
                Photo Gallery
              </span>
            </Link>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              onClick={myFunction}
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
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="flex flex-col mt-4 max-sm:space-y-5 text-center flex-wrap items-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    className="text-white max-sm:text-black border-2 border-slate-200 max-sm:bg-white py-2.5 px-6 rounded-md bg-gradient-to-r from-sky-500 max-sm:from-white to-indigo-500 max-sm:to-white"
                    to="/"
                  >
                    Anasayfa
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="text-white max-sm:text-black border-2  border-slate-200 max-sm:bg-white py-2.5 px-6 rounded-md bg-gradient-to-r from-sky-500 max-sm:from-white to-indigo-500 max-sm:to-white"
                    onClick={handleLogout}
                  >
                    Çıkış yap
                  </button>
                </li>
                <div className="text-center relative items-center mx-auto">
                  <Link to="/settings">
                    {!user.photoURL ? (
                      <img
                        className="h-12 w-12 bg-slate-400 object-cover rounded-full bg-center m-auto"
                        src="/avatar.webp"
                        alt="avatar"
                      />
                    ) : (
                      <div className="block text-center justify-center relative">
                        <img
                          className="h-12 w-12 rounded-full m-auto object-cover bg-center"
                          src={user.photoURL}
                          alt="user-img"
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
  }
  return (
    <div>
      <div>
        <nav className="bg-white w-10/12 mx-auto border-b-2 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
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
              onClick={myFunction}
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
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="flex flex-col max-sm:space-y-5 text-center flex-wrap p-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    className="text-white py-2.5 px-6 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500"
                    to="/"
                  >
                    Anasayfa
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white py-2.5 px-6 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500"
                    to="/login"
                  >
                    Giriş
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-white py-2.5 px-6 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500"
                    to="/register"
                  >
                    Kayıt ol
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
