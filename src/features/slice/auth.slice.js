import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

const user = localStorage.getItem("user");
const token = localStorage.getItem("Authorization");
// Trạng thái ban đầu
const initialState = {
  user: user ? user : null, // Thông tin người dùng
  token: token ? token : null, // Token xác thực
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const data = await authService.register(userData);
      if (data.status === "false") {
        return thunkAPI.rejectWithValue(data.stack.response.message[0]);
      }
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk để xử lý đăng nhập
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      if (response.status === "success") {
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("Authorization", response.data.token);
      } else {
        return thunkAPI.rejectWithValue(response.stack.response.message);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk để xử lý đăng xuất
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  localStorage.removeItem("user");
  localStorage.removeItem("Authorization");
});

// Tạo slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    // Khôi phục trạng thái từ localStorage khi khởi động
    restoreAuth: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("Authorization");
      if (user && token) {
        state.user = user;
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.data || "Register successfully";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { reset, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
