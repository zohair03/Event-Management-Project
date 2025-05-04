import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth.jsx";

const Navbar = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
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
            <h2>Evently</h2>
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
            {/* <span>{auth?.user?.name}</span> */}
            <Link to="/profile" className="profilePic">
              <img src="/assets/images/tribegrl.jpeg" alt="Profile Pic" />
            </Link>
            <button className="btn" onClick={handleClick}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="navbartext btn"
              style={{ paddingTop: "0.7rem", paddingBottom: "0.70rem" }}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
