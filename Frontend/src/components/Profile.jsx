import { useEffect, useState } from "react";
import useApiPrivate from "../Hooks/useApiPrivate.jsx";
import Event from "./Event.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
      {/* heading */}
      <section className="headingSection">
        <div>
          <h1>My Tickets</h1>
          <button className="btn">Explore More Events</button>
        </div>
      </section>

      {/* tickets */}
      <section className="">
        <div className="tickets">
          <h3 className="ticketsH1">No Events Tickets Purchased Yet</h3>
          <h3 className="ticketsH2">
            No Worries Plenty Of Exciting Events To Explore
          </h3>
        </div>
      </section>

      {/* heading */}
      <section className="headingSection">
        <div>
          <h1>Events organized</h1>
          <button className="btn">Create New Event</button>
        </div>
      </section>

      {/* events */}
      <section className="">
        <div className="events">
          <div className="eventsDiv">
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
                  img={"https://picsum.photos/300/200"}
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
        </div>
      </section>
    </>
  );
};

export default Profile;
