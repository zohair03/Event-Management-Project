import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Event from "./Event.jsx";
import useApiPrivate from "../Hooks/useApiPrivate.jsx";
import useAuth from "../Hooks/useAuth.jsx";
import BannerCarousel from "./BannerCarousel.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { auth } = useAuth();

  const apiPrivate = useApiPrivate();
  const [events, setEvents] = useState();
  var isAdmin = false;

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

  function onDeleted(id) {
    setEvents((preValue) => {
      return preValue.filter((event) => {
        return event._id !== id;
      });
    });
  }

  return (
    <div className="crowdBackground">

      <section className="bannerSection">
        <div className="bannerC">
          <BannerCarousel />
        </div>
      </section>

      <section className="events ">
        <div className="eventsDiv">
          {events?.length ? (
            events.map((event, i) => {
              if (auth.user.email === "admin03@gmail.com") {
                isAdmin = true;
              }
              return (
                <Event
                  key={i}
                  id={event._id}
                  name={event.name}
                  location={event.location}
                  description={event.description}
                  organizer={event.organizer}
                  isDeleted={onDeleted}
                  edit={
                    isAdmin
                      ? true
                      : auth.user.email === event.email
                      ? true
                      : false
                  }
                  img={"https://picsum.photos/1000/1000"}
                />
              );
            })
          ) : (
            <p>No events on going</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
