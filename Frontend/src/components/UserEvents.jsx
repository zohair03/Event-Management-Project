import { useEffect, useState } from "react";
import useApiPrivate from "../Hooks/useApiPrivate.jsx";
import Event from "./Event.jsx";
import { useNavigate } from "react-router-dom";

const UserEvents = () => {
  const apiPrivate = useApiPrivate();
  const navigate = useNavigate();

  const [events, setEvents] = useState();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await apiPrivate.get("/api/event/myEvents");
        setEvents(response.data.usersEvents);
      } catch (err) {
        console.log("error in getting all events: ", err);
      }
    };
    getEvents();
  }, []);

  function onDeleted(id) {
    setEvents((preValue) => {
      return preValue.filter((event) => {
        return event._id !== id;
      });
    });
  }

  return (
    <>
      <div>
        {events?.length ? (
          events.map((event, i) => (
            <Event
              key={i}
              id={event._id}
              name={event.name}
              location={event.location}
              description={event.description}
              organizer={event.organizer}
              edit={true}
              isDeleted={onDeleted}
            />
          ))
        ) : (
          <>
            <p>Create your own event !!</p>
            <button
              onClick={() => {
                navigate("/createEvent");
              }}
            >
              Create New Event
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UserEvents;
