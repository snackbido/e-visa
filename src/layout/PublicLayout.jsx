import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const PublicLayout = ({ isLoading, currentUser }) => (
  <>
    <Header currentUser={currentUser} isLoading={isLoading} />
    <Outlet />
    <Footer />
  </>
);
