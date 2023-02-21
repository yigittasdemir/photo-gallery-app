import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";

import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB93_tv2aTNqRih5jOcyaPyba5KdWlx_8Q",
  authDomain: "photo-gallery-830ca.firebaseapp.com",
  projectId: "photo-gallery-830ca",
  storageBucket: "photo-gallery-830ca.appspot.com",
  messagingSenderId: "898433743333",
  appId: "1:898433743333:web:b405bf7f8589201bb4170c",
  measurementId: "G-XVQ55BKDZF",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
      })
    );
  } else {
    store.dispatch(logoutHandle);
  }
});

export const deleteTodo = async (id) => {
  try {
    toast.success("Silindi");
    return await deleteDoc(doc(db, "todos", id));
  } catch (error) {
    toast.error("Silinemedi");
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil Güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Şifreniz güncellendi");
    return true;
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      store.dispatch();
    }
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export default app;
