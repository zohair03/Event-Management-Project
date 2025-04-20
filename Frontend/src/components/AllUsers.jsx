import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useApiPrivate from "../Hooks/useApiPrivate.jsx";
import User from "./User.jsx";

const AllUsers = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const apiPrivate = useApiPrivate();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await apiPrivate.get("/api/user/allUsers");
        setUsers(response.data.allUser);
      } catch (err) {
        console.log("error in getting all users: ", err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getAllUsers();
  }, []);

  return (
    <>
      <div>
        {users?.length ? (
          users.map((user, i) => (
            <User
              key={i}
              id={user._id}
              name={user.name}
              email={user.email}
              userName={user.userName}
              role={user.role}
            />
          ))
        ) : (
          <p>No users</p>
        )}
      </div>
    </>
  );
};

export default AllUsers;
