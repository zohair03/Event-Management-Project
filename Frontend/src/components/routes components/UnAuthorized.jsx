import React from "react";
import "./Layout.css";

const UnAuthorized = () => {
  return (
    <div className="pageMsg">
      <h1>UnAuthorized</h1>
      <p>You are not authorized for this route</p>
    </div>
  );
};

export default UnAuthorized;