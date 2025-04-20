import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth.jsx";

const Navbar = ({ profile }) => {
  const { auth } = useAuth();

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
        <Link to="/dashboard" className="navbartext button">
          Dashboard
        </Link>
        <Link to="/createEvent" className="navbartext button">
          Create Event
        </Link>
        <Link to="/myEvents" className="navbartext button">
          My events
        </Link>
        <Link to="/allUsers" className="navbartext button">
          All Users
        </Link>
        <Link to="/login" className="navbartext button">
          Login
        </Link>
        <span>{auth?.user?.name}</span>
        <button onClick={handleClick}>LogOut</button>
      </div>
    </div>
  );
};

export default Navbar;
