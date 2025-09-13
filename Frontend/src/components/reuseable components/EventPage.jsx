import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../../api/axios.js";
import useAuth from "../../Hooks/useAuth.jsx";
import Event from "./Event.jsx";
import Pagination from "./Pagination.jsx";
import "./EventPage.css";

const EventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: paramId, category: paramCategory } = useParams();
  const { auth } = useAuth();
  var isAdmin = false;

  const [eventClicked, setEventClicked] = useState(location?.state);
  const [id, setId] = useState(eventClicked?.id || paramId);
  const [category, setCategory] = useState(
    eventClicked?.category || paramCategory
  );
  const [seletedEvent, setSeletedEvent] = useState({});
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [lastPage, setLastPage] = useState();

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

  const handlePage = (startIndex, lastIndex) => {
    setCurrentPage(startIndex);
    setLastPage(lastIndex);
  };

  const makePayment = async () => {
    if (auth?.user?._id) {
      try {
        const response = await api.post(
          "/api/payment/create-checkout-session",
          {
            eventHostEmail: seletedEvent.email,
            buyer: auth.user.name + " " + auth.user.lastName,
            eventName: seletedEvent.name,
            price: seletedEvent.price,
            eventId: id,
            userId: auth.user._id,
            eventImage: seletedEvent.banner,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        window.location.href = response.data;
      } catch (err) {
        console.log("Error in making payment ", err);
      }
    } else {
      navigate("/login", {
        state: {
          from: { pathname: `/events/${id}/${category}`, id: id, category: category },
        },
      });
    }
  };

  const checkOrders = () =>{
    navigate("/orders");
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
                <div className="eventPageTitleDivF">
                  <div className=" btnPriceEventsPage">
                    {seletedEvent.free ? "Free" : `RM ${seletedEvent.price}`}
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
              {seletedEvent.email === auth?.user?.email ? (
                <button onClick={checkOrders} className="btn getTbtn">Check Orders</button>
              ) : seletedEvent.free ? (
                <div></div>
              ) : (
                <button onClick={makePayment} className="btn getTbtn">
                  Get Ticket
                </button>
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
              relatedEvents
                .slice()
                .reverse()
                .slice(currentPage, lastPage)
                .map((event, i) => {
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
          <Pagination
            arrayLenth={relatedEvents?.length}
            numberOfPost={6}
            index={handlePage}
          />
        </div>
      </section>
    </>
  );
};

export default EventPage;
