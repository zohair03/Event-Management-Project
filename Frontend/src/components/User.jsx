import React from "react";

const User = ({ id, name, email, userName, role }) => {
  return (
    <div className="card">
      <p>_id:{id}</p>
      <p>name:{name}</p>
      <p>email:{email}</p>
      <p>userName:{userName}</p>
      <p>role:{role}</p>
    </div>
  );
};

export default User;