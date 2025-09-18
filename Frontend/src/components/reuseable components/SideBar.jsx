import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "./SideBar.css";

const SideBar = ({ active, closeSideBar }) => {
  const { auth } = useAuth();

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <div className={active ? "nav-menu active " : "nav-menu"}>
        <div className="crossDiv">
          <img
          src="/assets/icons/close.svg"
          alt="close"
          onClick={() => {
            closeSideBar(true);
          }}
        />
        </div>

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

        <div className="sideBarTabs">
          <div>
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
              style={{
                color: location.pathname === "/createEvent" && "#624CF5",
              }}
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
                style={{
                  color: location.pathname === "/allUsers" && "#624CF5",
                }}
              >
                All Users
              </Link>
            )}
          </div>
          {auth?.user && (
            <button className="btn" onClick={handleClick}>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
