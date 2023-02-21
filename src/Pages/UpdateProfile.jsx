import { useDispatch, useSelector } from "react-redux";
import { update, resetPassword, auth } from "../firebase";
import { useState } from "react";
import { login } from "../store/auth";

const UpdateProfile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(password);
    setPassword("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto grid gap-y-4 py-8 "
      >
        <h1 className="text-xl font-semibold">Profili Güncelle</h1>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            İsim Soyisim
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={displayName}
              id="name"
              onChange={(e) => setDisplayName(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={user.displayName ?? "John Wick"}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={!displayName}
            className="inline-flex items-center cursor-pointer disabled:opacity-20 disabled:cursor-default rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Güncelle
          </button>
        </div>
      </form>

      <form
        onSubmit={handleResetSubmit}
        className="max-w-2xl mx-auto hidden gap-y-4 py-8"
      >
        <h1 className="text-xl font-semibold">Şifreyi Güncelle</h1>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Şifre
          </label>
          <div className="mt-1">
            <input
              type="password"
              value={password}
              id="name"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="******"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={!password}
            className="inline-flex items-center cursor-pointer disabled:opacity-20 disabled:cursor-default rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Şifreyi Güncelle
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;
