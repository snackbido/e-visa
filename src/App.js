import "./App.css";
import { ApplyVisa } from "./page/apply-visa";
import Home from "./page/home";
import { Route, Routes } from "react-router-dom";
import { Login } from "./page/login";
import { Register } from "./page/register";
import { Blog } from "./page/blog";
import PrivateRoute from "./components/PrivateRoute";
import { Provider } from "react-redux";
import { store } from "./features/store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/apply-visa" element={<ApplyVisa />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
