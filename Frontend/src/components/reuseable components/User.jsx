import React from "react";
import "./User.css"

const User = ({ id, name, lastName, email, userName, role, profilePic }) => {
  return (
    <div className="card SCard ">
      <div className="userCard">
        <div className="userPic">
          <img src={profilePic} alt="profile pic" />
        </div>

        <div className="userDetails">
          <p>id: {id}</p>
          <p>name: {name}</p>
          <p>email: {email}</p>
          <p>userName: {userName}</p>
          <p>role: {role}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
