import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const docRef = doc(db, "Posts", id);
    onSnapshot(docRef, (snapshot) => {
      setPost({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-white w-5/6 mx-auto px-2 sm:px-4 py-2.5">
        {post && (
          <div className="block">
            <div className="col-3 rounded-md">
              <img
                src={post.imageUrl}
                className="w-4/6 h-1/5 object-cover bg-center max-sm:w-full rounded-md mx-auto"
                alt={post.title}
              />
            </div>
            <div className="col-9  pl-4 py-4 leading-loose text-center">
              <h1 className="text-xl font-semibold">{post.title}</h1>
              <h5>Oluşturan: {post.createdBy}</h5>
              <div>
                Paylaşım zamanı: {post.createdAt.toDate().toDateString()}
              </div>
              <p className="text-lg">Açıklama: {post.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
