import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ currentUser }) => {
  // Nếu có user, cho phép truy cập, ngược lại chuyển hướng về trang login
  const { user } = useSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
