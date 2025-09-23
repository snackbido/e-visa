import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const PublicLayout = ({ currentUser, handleLogout }) => (
  <>
    <Header currentUser={currentUser} handleLogout={handleLogout} />
    <Outlet />
    <Footer />
  </>
);
