import axios from "../../axios/axios";

const API_URL = "/auth/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Đăng nhập người dùng
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Đăng xuất người dùng
const logout = async (body) => {
  // Nếu cần, bạn có thể gọi API logout ở đây
  const response = await axios.post(API_URL + "logout", body);
  return response.data;
};

const authService = {
  login,
  logout,
  register,
};

export default authService;
