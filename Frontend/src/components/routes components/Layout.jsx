import { Outlet } from "react-router-dom"
import Navbar from "../reuseable components/Navbar";
import Footer from "../reuseable components/Footer";

const Layout = () => {
  return (
    <main>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </main>
  )
}

export default Layout