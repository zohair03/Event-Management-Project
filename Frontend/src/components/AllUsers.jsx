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
      <section className="headingSection">
        <div>
          <h1>All Users</h1>
        </div>
      </section>

      <section style={{marginTop:"40px"}}>
        <div className="allUsers">
          {users?.length ? (
            users.map((user, i) => (
              <User
                key={i}
                id={user._id}
                name={user.name}
                userName={user.userName}
                role={user.role}
                email={user.email}
              />
            ))
          ) : (
            <p>No users</p>
          )}
        </div>
      </section>
    </>
  );
};

export default AllUsers;
