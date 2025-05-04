import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApiPrivate from "../Hooks/useApiPrivate.jsx";
import useAuth from "../Hooks/useAuth.jsx";
import Event from "./Event.jsx";

const EventPage = () => {
  const location = useLocation();
  const [eventClicked, setEventClicked] = useState(location.state);

  const [eventName, setEventName] = useState(eventClicked?.name);
  const [eventOrganizer, setEventOrganizer] = useState(eventClicked?.organizer);
  const [eventLocation, setEventLocation] = useState(eventClicked?.location);
  const [eventDescription, setEventDescription] = useState(
    eventClicked?.description
  );
  const [eventImg, setEventImg] = useState(eventClicked?.img);

  const [events, setEvents] = useState();
  const apiPrivate = useApiPrivate();
  const { auth } = useAuth();
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
  }, [eventClicked]);

  function onDeleted(id) {
    setEvents((preValue) => {
      return preValue.filter((event) => {
        return event._id !== id;
      });
    });
  }

  return (
    <>
      <section className="eventPageSection">
        <div className="eventPage">
          <div className="eventPageBanner">
            <img src={eventImg} alt="banner" />
          </div>

          <div className="eventPageDetails">
            <div className="eventPageTitle">
              <h2>{eventName}</h2>
              <div className="eventPageTitleDiv">
                <div>
                  <p className="btn btnPrice">Free</p>
                  <p className="btn btnGenera">space</p>
                </div>
                <p>
                  By{" "}
                  <span
                    style={{
                      color: "rgb(98 76 245 )",
                    }}
                  >
                    {eventOrganizer}
                  </span>
                </p>
              </div>
            </div>

            <div className="eventPageTicket">
              <p>Sorry, tickets are no longer available.</p>
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
                  <p>Sat, Mar 16, 2024 - 12:50 PM / </p>
                  <p>Sat, Mar 16, 2024 - 12:50 PM</p>
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
                <p>{eventLocation}</p>
              </div>
            </div>

            <div className="eventPageDic">
              <p className="fristP">What You'll Learn:</p>
              <p className="sP">{eventDescription}</p>
              <p className="tP">https://unsplash.com/s/photos/stars</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="detailSection">
          <h2 className="detailH2">
            Trust by <br /> Thousands of Events
          </h2>
          <div className="eventsDiv">
            {events?.length ? (
              events.map((event, i) => {
                if (auth?.user?.email === "admin03@gmail.com") {
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
                        : auth?.user?.email === event?.email
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
        </div>
      </section>
    </>
  );
};

export default EventPage;
