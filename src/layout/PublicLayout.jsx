import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const PublicLayout = ({ currentUser, handleLogout }) => (
  <>
    <Header currentUser={currentUser} handleLogout={handleLogout} />
    <Outlet />
    <Footer />
  </>
);
