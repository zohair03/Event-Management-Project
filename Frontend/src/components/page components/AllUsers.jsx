import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import User from "../reuseable components/User.jsx";
import Pagination from "../reuseable components/Pagination.jsx";
import "./AllUsers.css";

const AllUsers = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const apiPrivate = useApiPrivate();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(6);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await apiPrivate.get("/api/user/allUsers");
        setUsers(response?.data?.allUser);
      } catch (err) {
        console.log("error in getting all users: ", err);
      }
    };
    getAllUsers();
  }, []);

  const handlePage = (startIndex, lastIndex) => {
    setCurrentPage(startIndex);
    setLastPage(lastIndex);
  };

  return (
    <>
      <section className="headingSection">
        <div>
          <h1>All Users</h1>
        </div>
      </section>

      <section className="allUsersSection">
        <div className="eventsDiv">
          {users?.length ? (
            users
              .slice()
              .reverse()
              .slice(currentPage, lastPage)
              .map((user, i) => (
                <User
                  key={i}
                  id={user._id}
                  name={user.name}
                  lastName={user.lastName}
                  userName={user.userName}
                  role={user.role}
                  email={user.email}
                  profilePic={user.profilePic}
                />
              ))
          ) : (
            <p>No users</p>
          )}
        </div>
        <Pagination
          arrayLenth={users?.length}
          numberOfPost={6}
          index={handlePage}
        />
      </section>
    </>
  );
};

export default AllUsers;
