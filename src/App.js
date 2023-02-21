import "./App.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import Settings from "./Pages/Settings";
import Post from "./Pages/Post";

function App() {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
      <div>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
