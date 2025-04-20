import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Event from "./Event.jsx";
import useApiPrivate from "../Hooks/useApiPrivate.jsx";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const apiPrivate = useApiPrivate();
  const [events, setEvents] = useState();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await apiPrivate.get("/api/event/allEvents");
        setEvents(response.data.allEvents);
      } catch (err) {
        console.log("error in getting all events: ", err);
      }
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
              organizer={event.organizer}
              edit={false}
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
