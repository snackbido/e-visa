import { Outlet } from "react-router-dom";

export const AdminLayout = ({ currentUser }) => {
  if (currentUser?.role === "admin") {
    return <Outlet />;
  } else {
    return <Outlet />;
  }
};
