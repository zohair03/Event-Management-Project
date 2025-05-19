import { Link, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.jsx";
import "./Navbar.css";
import SideBar from "./SideBar.jsx";
import { useState } from "react";

const Navbar = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleSideBar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <div className="navbar">
      <div className="navbarLogo">
        <Link to="/" className="navbartext">
          <div className="EventlyLogo">
            <img
              src="/assets/icons/EventLogo3.svg"
              alt="EventlyLogo"
              width={40}
              height={40}
            />{" "}
            <h2 style={{ margin: "0px" }}>Evently</h2>
          </div>
        </Link>
      </div>

      <div className="navbtn">
        <Link
          to="/home"
          className="navbartext "
          style={{ color: location.pathname === "/home" && "#624CF5" }}
        >
          Home
        </Link>
        <Link
          to="/createEvent"
          className="navbartext "
          style={{ color: location.pathname === "/createEvent" && "#624CF5" }}
        >
          Create Event
        </Link>
        <Link
          to="/profile"
          className="navbartext "
          style={{ color: location.pathname === "/profile" && "#624CF5" }}
        >
          My Profile
        </Link>
        {auth?.user?.role === "admin" && (
          <Link
            to="/allUsers"
            className="navbartext"
            style={{ color: location.pathname === "/allUsers" && "#624CF5" }}
          >
            All Users
          </Link>
        )}
      </div>

      <div className="navbarLogout">
        {auth?.user ? (
          <div className="profilePicDiv">
            <div>
              <img
                src="/assets/icons/menu.svg"
                width={24}
                height={24}
                alt="sidebar"
                onClick={handleSideBar}
                className="sidebarbtn"
              />
              <SideBar active={isOpenSidebar} closeSideBar={handleSideBar} />
            </div>
            <Link to="/profile" className="profilePic">
              <img
                src={
                  auth?.user?.profilePic
                    ? auth?.user?.profilePic
                    : auth?.user?.profilePic === "" &&
                      "/assets/images/user_default_profile_pic.jpg"
                }
                alt="Profile Pic"
              />
            </Link>
            <button className="btn logoutDisply" onClick={handleClick}>
              Logout
            </button>
          </div>
        ) : (
          <div className="loginBtnDiv">
            <img
              src="/assets/icons/menu.svg"
              width={24}
              height={24}
              alt="sidebar"
              onClick={handleSideBar}
              className="sidebarbtn"
            />
            <SideBar active={isOpenSidebar} closeSideBar={handleSideBar} />
            <Link to="/login" className="btn navbartext loginBtn">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
