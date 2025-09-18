import { useEffect, useState } from "react";
import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import Event from "./Event.jsx";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.jsx";
import Pagination from "./Pagination.jsx";
import "./Profile.css";

const Profile = () => {
  const apiPrivate = useApiPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [events, setEvents] = useState();
  const [purchasedEvents, setPurchasedEvents] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(6);
  var isAdmin = false;

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await apiPrivate.get("/api/event/myEvents");
        setEvents(response.data.usersEvents);
      } catch (err) {
        console.log("error in getting all events: ", err);
      }
    };

    const getPurchasedEvents = async () => {
      try {
        const response = await apiPrivate.post("/api/event/purchasedEvents", {
          userId: auth.user._id,
        });
        setPurchasedEvents(response.data.userPurchasedEvents);
      } catch (err) {
        console.log("Error in Purchased Event API: ", err);
      }
    };

    getEvents();
    getPurchasedEvents();
  }, []);

  function onDeleted(id) {
    setEvents((preValue) => {
      return preValue.filter((event) => {
        return event._id !== id;
      });
    });
  }

  const scrollToElement = () => {
    eventsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePage = (startIndex, lastIndex) => {
    scrollToElement();
    setCurrentPage(startIndex);
    setLastPage(lastIndex);
  };

  return (
    <>
      {/* heading */}
      <section className="headingSection">
        <div>
          <h1>Account</h1>
          <button
            className="btn"
            onClick={() => {
              navigate("/updateProfile");
            }}
          >
            Account Settings
          </button>
        </div>
      </section>

      {/* account */}
      <section className="accountSection">
        <div className="account">
          {auth?.user && (
            <>
              <div className="accountPic">
                <img src={auth.user.profilePic} alt="profile pic" />
              </div>
              <div>
                <p>
                  Name: {auth.user.name} {auth.user.lastName}
                </p>
                <p>Email: {auth.user.email}</p>
                <p>userName: {auth.user.userName}</p>
                <p>role: {auth.user.role}</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* heading */}
      <section className="headingSection">
        <div>
          <h1>My Tickets</h1>
          <button
            className="btn"
            onClick={() => {
              navigate("/home");
            }}
          >
            Explore More Events
          </button>
        </div>
      </section>

      {/* tickets */}
      <section>
        {purchasedEvents?.length ? (
          <div className="events">
            <div className="eventsDiv">
              {purchasedEvents?.length ? (
                purchasedEvents.map((event, i) => {
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
                      edit={
                        isAdmin
                          ? true
                          : auth.user.email === event.email
                          ? true
                          : false
                      }
                      isDeleted={onDeleted}
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
                <></>
              )}
            </div>
            <Pagination
              arrayLenth={events?.length}
              numberOfPost={6}
              index={handlePage}
            />
          </div>
        ) : (
          <div className="tickets">
            <h3 className="ticketsH1">No Events Tickets Purchased Yet</h3>
            <h3 className="ticketsH2">
              No Worries Plenty Of Exciting Events To Explore
            </h3>
          </div>
        )}
      </section>

      {/* heading */}
      <section className="headingSection">
        <div>
          <h1>Events organized</h1>
          <button
            className="btn"
            onClick={() => {
              navigate("/createEvent");
            }}
          >
            Create New Event
          </button>
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
                  host={event.host}
                  edit={true}
                  isDeleted={onDeleted}
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
              <>
                <p>Create your own event !!</p>
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/createEvent");
                  }}
                >
                  Create New Event
                </button>
              </>
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

export default Profile;
