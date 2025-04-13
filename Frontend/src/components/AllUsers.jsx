import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth.jsx";
import User from "./User.jsx";

const AllUsers = () => {
  const { auth } = useAuth();

  const [users, setUsers] = useState();

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/allUsers",
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      setUsers(response.data.allUser);
    } catch (err) {
      console.log("error in getting all users: ", err);
    }
  }

  return (
    <>
      <div>
        {users?.length
          ? users.map((user, i) => (
              <User
                key={i}
                id={user._id}
                name={user.name}
                email={user.email}
                userName={user.userName}
                role={user.role}
              />
            ))
          : <p>No users</p>}
      </div>
    </>
  );
};

export default AllUsers;