import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbartext" >Events Zone</Link>
      <div>
        <Link to="/createEvent" className="navbartext button" > Create your own event</Link>
        <Link to="/loginPage" className="navbartext button" > Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
