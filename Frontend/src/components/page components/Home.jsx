import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Event from "../reuseable components/Event.jsx";
import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import api from "../../api/axios.js";
import useAuth from "../../Hooks/useAuth.jsx";
import BannerCarousel from "../reuseable components/BannerCarousel.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchEvent from "../reuseable components/SearchEvent.jsx";
import "./Home.css";

const Home = () => {
  const { auth } = useAuth();

  const apiPrivate = useApiPrivate();
  const [events, setEvents] = useState([]);
  const [lastEventsBanners, setLastEventsBanners] = useState([]);
  const [filter, setFilter] = useState("All");

  var isAdmin = false;

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await apiPrivate.get("/api/event/allEvents");
        setEvents(response.data.allEvents);
        handleLastEventsBanners(response.data.allEvents.slice().reverse());
      } catch (err) {
        console.log("error in getting all events: ", err);
      }
    };

    const getFilteredEvent = async () => {
      try {
        const response = await api.post("/api/event/category", {
          category: filter,
        });
        setEvents(response.data.isFilteredCategory);
      } catch (err) {
        console.log("error in getting filtered events: ", err);
      }
    };

    if (filter === "All") {
      getAllEvents();
    } else {
      getFilteredEvent();
    }
  }, [filter]);

  function onDeleted(id) {
    setEvents((preValue) => {
      return preValue.filter((event) => {
        return event._id !== id;
      });
    });
  }

  const handleFilterEvent = (category) => {
    setFilter(category);
  };

  const handleLastEventsBanners = (bannersArray) => {
    const lb = [];
    bannersArray.filter((e, i) => {
      if (i < 7) {
        return lb.push(e.banner);
      }
    });
    console.log("lb", lb);
    setLastEventsBanners(lb);
  };

  return (
    <div className="crowdBackground">
      <section className="bannerSection">
        <div className="bannerC">
          <BannerCarousel recentEventBanners={lastEventsBanners} />
        </div>
      </section>

      <section className="homePageEventSearch">
        <div className="homePageEventSearchDiv">
          <SearchEvent categorySelected={handleFilterEvent} />
        </div>
      </section>

      <section className="events ">
        <div className="eventsDiv">
          {events?.length ? (
            events
              .slice()
              .reverse()
              .map((event, i) => {
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
                    host={event.host}
                    isDeleted={onDeleted}
                    edit={
                      isAdmin
                        ? true
                        : auth.user.email === event.email
                        ? true
                        : false
                    }
                    category={event.category}
                    img={event.banner}
                    startDate={event.startDate}
                    startTime={event.startTime}
                    endDate={event.endDate}
                    endTime={event.endTime}
                    price={event.price}
                    free={event.free}
                    link={event.link}
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
