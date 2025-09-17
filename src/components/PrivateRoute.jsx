import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  // Nếu có user, cho phép truy cập, ngược lại chuyển hướng về trang login
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
