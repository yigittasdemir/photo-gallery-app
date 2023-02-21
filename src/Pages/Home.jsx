import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import PhotoGallery from "./PhotoGallery";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
      <div className="max-w-full mx-auto">
        <Toaster position="top-right" />
        <Navbar />
        <PhotoGallery />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <PhotoGallery />
    </div>
  );
};

export default Home;
