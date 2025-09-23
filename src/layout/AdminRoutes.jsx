import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = ({ currentUser }) => {
  if (currentUser?.role === "admin") {
    return <Outlet />;
  }
  return <Navigate to="/admin/signin" />;
};
