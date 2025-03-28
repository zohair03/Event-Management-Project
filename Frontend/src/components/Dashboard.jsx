import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ token }) => {
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/event/allEvents", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("all events: ", res.data.allEvents);
        setEvent(res.data.allEvents);
      });
  },[]);

  return (
    <>
      <div>
        <div className="card">
          <h1>event name</h1>
          <p>location</p>
          <p>discription</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;