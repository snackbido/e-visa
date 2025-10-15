import { Outlet } from "react-router-dom";

export const AdminLayout = ({ currentUser }) => {
  if (currentUser?.role === "admin") {
    return <Outlet />;
  } else {
    localStorage.removeItem("user")
    localStorage.removeItem("Authorization")
    return <Outlet />;
  }
};
