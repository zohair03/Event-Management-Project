import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/createEvent"> Create your own event</Link>
    </div>
  );
};

export default Navbar;
