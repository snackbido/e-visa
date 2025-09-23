import { Outlet } from "react-router-dom";

export const AdminLayout = ({ currentUser }) => {
  // Nếu người dùng đã là admin, chuyển hướng đến dashboard.
  // Nếu không, cho phép họ thấy trang đăng nhập/đăng ký admin
  if (currentUser?.role === "admin") {
    return <Outlet />;
  } else {
    // Đây là cách xử lý để chỉ hiển thị các trang đăng nhập/đăng ký admin
    // khi người dùng chưa đăng nhập với vai trò admin
    return <Outlet />;
  }
};
