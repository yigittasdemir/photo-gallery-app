import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

export default function AddArticle() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!user.displayName) {
      alert("Profil Kısmından kullanıcı ismi oluşturmalısın");
    } else {
      const storageRef = ref(
        storage,
        `/images/${Date.now()}${formData.image.name}`
      );

      const uploadImage = uploadBytesResumable(storageRef, formData.image);

      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        (err) => {
          console.log(err);
        },
        () => {
          setFormData({
            title: "",
            description: "",
            image: "",
          });

          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const postRef = collection(db, "Posts");
            addDoc(postRef, {
              title: formData.title,
              description: formData.description,
              imageUrl: url,
              createdAt: Timestamp.now().toDate(),
              createdBy: user.displayName,
              userId: user.uid,
              likes: [],
              comments: [],
            }).then(() => {
              setProgress(0);
            });
          });
        }
      );
    }
  };

  return (
    <div className="p-3 mt-3 rounded-md bg-slate-200">
      {!user ? (
        <>
          <h2>
            <Link to="/signin">Login to create article</Link>
          </h2>
          Don't have an account? <Link to="/register">Signup</Link>
        </>
      ) : (
        <>
          <h1 className="text-lg font-semibold">Gönderi Oluştur</h1>
          <div className="form-group grid">
            <input
              type="text"
              name="title"
              className="form-control mt-2 rounded-md border-gray-100"
              value={formData.title}
              placeholder="Başlık"
              onChange={(e) => handleChange(e)}
            />

            <textarea
              name="description"
              className="form-control py-4 mt-2 rounded-md border-gray-100"
              placeholder="Açıklama"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control py-4  mt-2"
              onChange={(e) => handleImageChange(e)}
            />
          </div>

          {progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}
          <button
            disabled={!formData.image || !formData.title}
            className="form-control disabled:bg-indigo-300 btn-primary mt-2 text-white bg-indigo-400 py-2 px-6 rounded-md"
            onClick={handlePublish}
          >
            Paylaş
          </button>
        </>
      )}
    </div>
  );
}
