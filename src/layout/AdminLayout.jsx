import { Outlet } from "react-router-dom";

export const AdminLayout = ({ currentUser }) => {
  console.log(currentUser);
  if (currentUser?.role === "admin") {
    return <Outlet />;
  } else {
    return <Outlet />;
  }
};
