import React from "react";

const User = ({ id, name, email, userName, role }) => {
  return (
    <div className="card ">
      <div className="userCard">
        <p>_id:{id}</p>
        <p>name:{name}</p>
        <p>email:{email}</p>
        <p>userName:{userName}</p>
        <p>role:{role}</p>
      </div>
    </div>
  );
};

export default User;
