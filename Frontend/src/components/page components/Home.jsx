import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Event from "../reuseable components/Event.jsx";
import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import api from "../../api/axios.js";
import useAuth from "../../Hooks/useAuth.jsx";
import BannerCarousel from "../reuseable components/BannerCarousel.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchEvent from "../reuseable components/SearchEvent.jsx";
import Pagination from "../reuseable components/Pagination.jsx";
import "./Home.css";

const Home = () => {
  const { auth } = useAuth();

  const eventsRef = useRef(null);

  const apiPrivate = useApiPrivate();

  const [events, setEvents] = useState([]);
  const [lastEventsBanners, setLastEventsBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(6);
  var isAdmin = false;

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      const response = await apiPrivate.get("/api/event/allEvents");
      setEvents(response.data.allEvents);
      handleLastEventsBanners(response.data.allEvents.slice().reverse());
    } catch (err) {
      console.log("error in getting all events: ", err);
    }
  };

  function onDeleted(id) {
    setEvents((preValue) => {
      return preValue.filter((event) => {
        return event._id !== id;
      });
    });
  }

  const handleEventsArray = (array) => {
    if (array === "All") {
      return getAllEvents();
    }
    setEvents(array);
  };

  const handleLastEventsBanners = (bannersArray) => {
    const lb = [];
    var banObj = {};
    bannersArray.filter((e, i) => {
      banObj = {
        id: e._id,
        cat: e.category,
        eBan: e.banner,
        eName: e.name,
        eHost: e.host,
        eStartDate: e.startDate,
        eLocation: e.location,
      };
      if (i < 7) {
        return lb.push(banObj);
      }
    });
    setLastEventsBanners(lb);
  };

  const scrollToElement = () => {
    eventsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePage = (startIndex, lastIndex) => {
    scrollToElement();
    setCurrentPage(startIndex);
    setLastPage(lastIndex);
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
          <SearchEvent eventsArray={handleEventsArray} />
        </div>
      </section>

      <section className="events ">
        <div ref={eventsRef} className="eventsDiv">
          {events?.length ? (
            events
              .slice()
              .reverse()
              .slice(currentPage, lastPage)
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
            <p style={{display:"flex", justifyContent:"center"}}>No events on going</p>
          )}
        </div>
        <Pagination
          arrayLenth={events?.length}
          numberOfPost={6}
          index={handlePage}
        />
      </section>
    </div>
  );
};

export default Home;
