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
import AppLayout from "./admin/layout/AppLayout";
import UserProfiles from "./admin/pages/UserProfiles";
import Blank from "./admin/pages/Blank";
import NotFound from "./admin/pages/OtherPage/NotFound";
import SignIn from "./admin/pages/AuthPages/SignIn";
import SignUp from "./admin/pages/AuthPages/SignUp";
import HomeDashboard from "./admin/pages/Dashboard/Home";
import { Visa } from "./admin/pages/Visas/Visa";
import { User } from "./admin/pages/Users/User";

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
      {currentUser.role === "user" && (
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
      )}
      {/* <ScrollToTop /> */}
      {currentUser.role === "admin" && (
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/admin" element={<HomeDashboard />} />

            {/* Others Page */}
            <Route path="/admin/profile" element={<UserProfiles />} />
            <Route path="/admin/blank" element={<Blank />} />

            {/* Tables */}
            <Route path="/admin/visa-management" element={<Visa />} />
            <Route path="/admin/user-management" element={<User />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/admin/signin" element={<SignIn />} />
          <Route path="/admin/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}
