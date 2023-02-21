import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import DeletePost from "../components/DeletePost";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import CreatePost from "../components/CreatePost";

const PhotoGallery = () => {
  const { user } = useSelector((state) => state.auth);
  const [isShown, setIsShown] = useState(false);

  const createPost = () => {
    if (!user) {
      toast.error("Lütfen Giriş Yapınız!");
    } else {
      setIsShown((current) => !current);
    }
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postRef = collection(db, "Posts");
    const q = query(postRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(posts);
    });
  }, []);
  return (
    <div className="bg-white mx-auto mt-8 w-5/6 max-sm:w-full max-lg:w-12/12 ">
      <div className="max-sm:block max-sm:text-left max-md:w-12/12">
        <button
          onClick={createPost}
          className="ml-10 bg-gradient-to-r rounded-md from-sky-500 to-indigo-500 py-2 px-4 text-white font-semibold"
        >
          Fotoğraf Paylaş
        </button>
      </div>
      <div className="px-6 py-3">{isShown && <CreatePost />}</div>
      <div className="px-6 py-5 grid mx-auto grid-cols-3 gap-1 max-sm:grid-cols-1 max-lg:grid-cols-2 flex-wrap">
        {posts.length === 0 ? (
          <div className="bg-slate-200 mx-auto p-6 mt-8 w-full max-sm:w-full rounded-md max-lg:w-12/12 ">
            <h1 className="text-xl font-semibold">Henüz Gönderi Yok</h1>
          </div>
        ) : (
          posts.map(
            ({
              id,
              title,
              description,
              imageUrl,
              createdAt,
              createdBy,
              userId,
            }) => (
              <div
                className="rounded-md mt-3 p-3 bg-slate-100 w-11/12 max-sm:w-full max-lg:w-full"
                key={id}
              >
                <div className="row">
                  <div className="col-3">
                    <Link to={`/post/${id}`}>
                      <img
                        src={imageUrl}
                        alt="title"
                        className="w-full object-cover h-44 rounded-md"
                      />
                    </Link>
                  </div>
                  <div className="col-9 ps-3">
                    <div className="row">
                      <div className="col-6 py-1 flex justify-between">
                        {createdBy && (
                          <span className="badge bg-primary font-semibold text-lg">
                            {createdBy}
                          </span>
                        )}
                        <p>{createdAt.toDate().toDateString()}</p>
                      </div>
                      <div className="col-6 d-flex flex-row-reverse">
                        {user && user.uid === userId && (
                          <DeletePost id={id} imageUrl={imageUrl} />
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <h5>{description}</h5>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
