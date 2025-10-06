import { Route, Routes } from "react-router-dom";
import { Login } from "./page/auth/login";
import PrivateRoute from "./components/PrivateRoute";
import { ApplyVisa } from "./page/apply-visa";
import { Profile } from "./page/profile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "./axios/axios";
import Home from "./page/home";
import AppLayout from "./admin/layout/AppLayout";
import NotFound from "./admin/pages/OtherPage/NotFound";
import SignIn from "./admin/pages/AuthPages/SignIn";
import SignUp from "./admin/pages/AuthPages/SignUp";
import HomeDashboard from "./admin/pages/Dashboard/Home";
import { Visa } from "./admin/pages/Visas/Visa";
import { User } from "./admin/pages/Users/User";
import { PublicLayout } from "./layout/PublicLayout";
import { AdminLayout } from "./layout/AdminLayout";
import { AdminRoutes } from "./layout/AdminRoutes";
import { Blog } from "./page/blog";
import { ToastContainer } from "react-toastify";
import PaymentStatus from "./page/payment-status";
import { Register } from "./page/auth/register";
import { ForgotPassword } from "./page/auth/forgot-password";
import { ResetPassword } from "./page/auth/reset-password";

export function AppRoutes() {
  const { user } = useSelector((state) => state.auth) || "";
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const getUser = async (id) => {
        try {
          const { data } = await axios.get(`/user/${id}`);
          if (data.status === "success") {
            setCurrentUser(data.data);
            setLoading(false);
          }
        } catch (error) {
          localStorage.removeItem("userId");
          localStorage.removeItem("authToken");
        } finally {
          setLoading(false);
        }
      };

      getUser(user);
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleLogout = () => {};

  return (
    <>
      <Routes>
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <PublicLayout
              currentUser={currentUser}
              handleLogout={handleLogout}
              isLoading={loading}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="login" element={<Login currentUser={currentUser} />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route element={<PrivateRoute currentUser={currentUser} />}>
            <Route
              path="apply-visa"
              element={<ApplyVisa user={currentUser} />}
            />
            <Route path="profile" element={<Profile user={currentUser} />} />
            <Route path="payment-status" element={<PaymentStatus />} />
          </Route>
        </Route>

        <Route
          path="/admin"
          element={<AdminLayout currentUser={currentUser} />}
        >
          <Route path="signin" element={<SignIn currentUser={currentUser} />} />
          <Route path="signup" element={<SignUp />} />

          <Route element={<AdminRoutes currentUser={currentUser} />}>
            <Route element={<AppLayout />}>
              <Route index element={<HomeDashboard />} />
              <Route path="visa-management" element={<Visa />} />
              <Route path="user-management" element={<User />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound currentUser={currentUser} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
