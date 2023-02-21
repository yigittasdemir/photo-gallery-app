import { useState } from "react";
import { auth, register } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login as loginHandle } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await register(email, password);

    try {
      dispatch(loginHandle(user));
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form
      className="max-w-xl mx-auto grid gap-y-4 py-4 max-sm:px-4 md:px-4 px-52 mt-24"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto text-3xl font-bold">Kayıt Ol</h1>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-posta
        </label>
        <div className="mt-1">
          <input
            type="email"
            required={true}
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="user@gmail.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Parola
        </label>
        <div className="mt-1">
          <input
            type="password"
            value={password}
            required={true}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="minimum 6 karakter"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          disabled={!email || !password}
          className="inline-flex items-center cursor-pointer disabled:opacity-20 disabled:cursor-default rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Kayıt Ol
        </button>
        <div className="space-x-2">
          <Link
            to="/"
            className="inline-flex items-center cursor-pointer disabled:opacity-20 disabled:cursor-default rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Anasayfa
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center cursor-pointer disabled:opacity-20 disabled:cursor-default rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Hesabın var mı?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
