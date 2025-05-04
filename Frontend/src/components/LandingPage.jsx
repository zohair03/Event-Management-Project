import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Event from "./Event.jsx";
import useApiPrivate from "../Hooks/useApiPrivate.jsx";

const LandingPage = () => {
  const apiPrivate = useApiPrivate();
  const [events, setEvents] = useState();

  const eventsRef = useRef(null);

  const scrollToElement = () => {
    eventsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      {/* hero */}
      <section className="heroSection">
        <div className="hero">
          <div className="heroContent">
            <h1>
              Host, Connect,
              <br /> Celebrate: Your <br /> Events In Our Platform!
            </h1>
            <span>
              Book and learn helpful tips from 4000+ mentors in world-class
              companies with our global community.
            </span>
            <div>
              <button className="btn" onClick={scrollToElement}>
                Explore Now
              </button>
            </div>
          </div>
          <div className="heroImg">
            <img src="../../assets/images/hero.png" alt="hero image" />
          </div>
        </div>
      </section>

      {/* details */}
      <section>
        <div ref={eventsRef} className="detailSection">
          <h2 className="detailH2">
            Trust by <br /> Thousands of Events
          </h2>
          <div className="eventsDiv">
            {events?.length ? (
              events.map((event, i) => (
                <Event
                  key={i}
                  name={event.name}
                  location={event.location}
                  description={event.description}
                  organizer={event.organizer}
                  edit={false}
                  img={"https://picsum.photos/300/200"}
                />
              ))
            ) : (
              <p>No events on going</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
