import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth.jsx";
import Event from "./Event.jsx";
const Dashboard = () => {
  const { auth } = useAuth();
  const [events, setEvents] = useState();

  useEffect(() => {
    const getEvents = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/event/allEvents",
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      setEvents(response.data.allEvents);
    };
    getEvents();
  }, []);

  return (
    <>
      <div>
        {events?.length ? (
          events.map((event, i) => (
            <Event
              key={i}
              name={event.name}
              location={event.location}
              description={event.description}
            />
          ))
        ) : (
          <p>No events on going</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
