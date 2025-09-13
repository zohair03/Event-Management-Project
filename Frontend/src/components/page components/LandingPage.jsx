import { useEffect, useState, useRef } from "react";
import Event from "../reuseable components/Event.jsx";
import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import api from "../../api/axios.js";
import SearchEvent from "../reuseable components/SearchEvent.jsx";
import "./LandingPage.css";
import Pagination from "../reuseable components/Pagination.jsx";

const LandingPage = () => {
  const apiPrivate = useApiPrivate();
  const eventsRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(6);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      const response = await apiPrivate.get("/api/event/allEvents");
      setEvents(response.data.allEvents);
    } catch (err) {
      console.log("error in getting all events: ", err);
    }
  };

  const scrollToElement = () => {
    eventsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEventsArray = (array) => {
    if (array === "All") {
      return getAllEvents();
    }
    setEvents(array);
  };

  const handlePage = (startIndex, lastIndex) => {
    scrollToElement();
    setCurrentPage(startIndex);
    setLastPage(lastIndex);
  };

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
            <img
              src="../../assets/images/homePageBanners/standupC.jpg"
              alt="hero image"
            />
          </div>
        </div>
      </section>

      {/* details */}
      <section>
        <div ref={eventsRef} className="detailSection">
          <h2 className="detailH2">
            Trust by <br /> Thousands of Events
          </h2>

          <SearchEvent eventsArray={handleEventsArray} />

          <div className="eventsDiv">
            {events?.length ? (
              events
                .slice()
                .reverse()
                .slice(currentPage, lastPage)
                .map((event, i) => (
                  <Event
                    key={i}
                    id={event._id}
                    name={event.name}
                    location={event.location}
                    description={event.description}
                    host={event.host}
                    edit={false}
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
                ))
            ) : (
              <p>No events on going</p>
            )}
          </div>
          <Pagination
            arrayLenth={events?.length}
            numberOfPost={6}
            index={handlePage}
          />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
