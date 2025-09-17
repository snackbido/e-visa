import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Login } from "./page/login";
import { Register } from "./page/register";
import { Blog } from "./components/Blog";
import PrivateRoute from "./components/PrivateRoute";
import { ApplyVisa } from "./page/apply-visa";
import { Profile } from "./page/profile";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "./axios/axios";
import Home from "./page/home";

export function PublicRoutes() {
  const { user } = useSelector((state) => state.auth) || "";
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/user/${user}`);
      if (data.status === "success") {
        setCurrentUser(data.data);
      }
    };
    getUser();
  }, [user]);

  return (
    <>
      <Header user={user} currentUser={currentUser} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="" element={<PrivateRoute user={user} />}>
          <Route
            path="/apply-visa"
            element={<ApplyVisa user={currentUser} />}
          />
          <Route path="/profile" element={<Profile user={currentUser} />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
