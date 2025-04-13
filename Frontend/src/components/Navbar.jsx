import React from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar = ({ profile }) => {
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbartext">
        Events Zone
      </Link>
      <div>
        <Link to="/createEvent" className="navbartext button">
          Create your own event
        </Link>
        <Link to="/dashboard" className="navbartext button">
          Dashboard
        </Link>
        <Link to="/updateEvent" className="navbartext button">
          Update your event
        </Link>
        <Link to="/allUsers" className="navbartext button">
          Users
        </Link>
        <Link to="/login" className="navbartext button">
          Login
        </Link>
        <span>{profile}</span>
        <button onClick={handleClick}>LogOut</button>
      </div>
    </div>
  );
};

export default Navbar;
