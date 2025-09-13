import { Outlet } from "react-router-dom";
import Navbar from "../reuseable components/Navbar";
import Footer from "../reuseable components/Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <main className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
