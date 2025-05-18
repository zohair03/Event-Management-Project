import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import api from "../../api/axios.js";
import useAuth from "../../Hooks/useAuth.jsx";
import Event from "./Event.jsx";

const EventPage = () => {
  const location = useLocation();
  const { auth } = useAuth();
  var isAdmin = false;

  const [eventClicked, setEventClicked] = useState(location?.state);
  const [id, setId] = useState(eventClicked?.id);
  const [category, setCategory] = useState(eventClicked?.category);
  const [seletedEvent, setSeletedEvent] = useState({});
  const [relatedEvents, setRelatedEvents] = useState([]);

  useEffect(() => {
    const getEventbyId = async () => {
      try {
        const response = await api.post(`/api/event/eventById/${id}`);
        setSeletedEvent(response.data.selectedEvent);
      } catch (err) {
        console.log("error in getting seleted event: ", err);
      }
    };

    const getRelatedEvents = async () => {
      try {
        const response = await api.get(`/api/event/relatedEvent/${category}`);
        setRelatedEvents(response.data.relatedEvents);
      } catch (err) {
        console.log("error in getting all related events: ", err);
      }
    };

    getRelatedEvents();
    getEventbyId();
  }, [id, category]);

  function onDeleted(id) {
    setEvents((preValue) => {
      return preValue.filter((event) => {
        return event._id !== id;
      });
    });
  }

  function handleEventClick(id, category) {
    setId(id);
    setCategory(category);
  }

  return (
    <>
      {/* event details section */}
      <section className="eventPageSection">
        <div className="eventPage">
          <div className="eventPageBanner">
            <img src={seletedEvent.banner} alt="banner" />
          </div>

          <div className="eventPageDetails">
            <div className="eventPageTitle">
              <h2>{seletedEvent.name}</h2>
              <div className="eventPageTitleDiv">
                <div className="eventPageTitleDiv">
                  <div className=" btnPriceEventsPage">
                    {seletedEvent.free ? "Free" : `$${seletedEvent.price}`}
                  </div>
                  <div className=" btnGeneraEventsPage">
                    {seletedEvent.category}
                  </div>
                </div>
                <p>
                  By{" "}
                  <span
                    style={{
                      color: "rgb(98 76 245 )",
                    }}
                  >
                    {seletedEvent.host}
                  </span>
                </p>
              </div>
            </div>

            <div className="eventPageTicket">
              {true ? (
                <button className="btn getTbtn">Get Ticket</button>
              ) : (
                <p>Sorry, tickets are no longer available.</p>
              )}
            </div>

            <div className="eventPagetimeloc">
              <div className="eventPagetime">
                <img
                  alt="calendar "
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  src="/assets/icons/calendar.svg"
                />
                <div>
                  <p>
                    {seletedEvent.startDate} - {seletedEvent.startTime}/{" "}
                  </p>
                  <p>
                    {seletedEvent.endDate} - {seletedEvent.endTime}
                  </p>
                </div>
              </div>
              <div className="eventPageloc">
                <img
                  alt="location "
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  src="/assets/icons/location.svg"
                />
                <p>{seletedEvent.location}</p>
              </div>
            </div>

            <div className="eventPageDic">
              <p className="fristP">What You'll Learn:</p>
              <p className="sP">{seletedEvent.description}</p>
              <p className="tP">{seletedEvent.link}</p>
            </div>
          </div>
        </div>
      </section>

      {/* related events section */}
      <section>
        <div className="detailSection">
          <h2 className="detailH2">Related Events</h2>
          <div className="eventsDiv">
            {relatedEvents?.length ? (
              relatedEvents.map((event, i) => {
                if (auth?.user?.email === "admin03@gmail.com") {
                  isAdmin = true;
                }
                if (event._id === id) {
                  return undefined;
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
                    isClicked={() => {
                      handleEventClick(event._id, event.category);
                    }}
                    edit={
                      isAdmin
                        ? true
                        : auth?.user?.email === event?.email
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
        </div>
      </section>
    </>
  );
};

export default EventPage;
