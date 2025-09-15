import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // Nếu có user, cho phép truy cập, ngược lại chuyển hướng về trang login
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
