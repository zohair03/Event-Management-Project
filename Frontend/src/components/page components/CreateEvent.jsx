import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import SelectCategory from "../reuseable components/SelectCategory.jsx";
import FileUpload from "../reuseable components/FileUpload.jsx";
import DateAndTime from "../reuseable components/DateAndTime.jsx";
import "./CreateEvent.css";

const CreateEvent = () => {
  const apiPrivate = useApiPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [category, setcategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [eventLink, setEventLink] = useState("");
  const [resMsg, setResMsg] = useState("");

  const event = {
    name: eventName,
    location: eventLocation,
    description: description,
    host: `${auth?.user?.name} ${auth?.user?.lastName}`,
    email: auth?.user?.email,
    banner: banner,
    category: category,
    startDate: startDate,
    endDate: endDate,
    price: price,
    free: isFree,
    link: eventLink,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPrivate.post("/api/event/createEvent", event);
      const id = response.data?.isCreated?._id;
      const category = response.data?.isCreated?.category;
      setResMsg(response.data.massege);

      if (response.statusText === "OK") {
        navigate(`/events/${id}`, {
          state: { id, category },
        });
      }
    } catch (err) {
      console.log("error in create event api", err);
      setResMsg(err.messege);
    }
  };

  const handleEventBanner = (bannerUrl) => {
    console.log("banner url: ", bannerUrl);
    setBanner(bannerUrl);
  };

  const handleSelectedCategory = (selectedCategory) => {
    setcategory(selectedCategory);
  };

  const handleSelectedStartDate = (date) => {
    const formatted = date.toLocaleString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setStartDate(formatted);
  };
  const handleSelectedEndDate = (date) => {
    const formatted = date.toLocaleString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setEndDate(formatted);
  };

  return (
    <>
      <section className="headingSection">
        <div>
          <h1>Create Event</h1>
        </div>
      </section>

      <section className="createSection">
        <div className="create">
          <form onSubmit={handleSubmit}>
            <div className="createGrid">
              {/* event title */}
              <input
                placeholder="Event Title"
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
                required
              />

              {/* categories */}
              <SelectCategory eventCategory={handleSelectedCategory} />

              <div className="textareAndBannerDiv">
                {/* textarea  */}
                <textarea
                  className="description"
                  placeholder="description"
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                {/* event banner */}
                <FileUpload eventBanner={handleEventBanner} />
              </div>

              {/* location */}
              <div className="CreateGridLocation">
                <img
                  src="/assets/icons/location-grey.svg"
                  width={24}
                  height={24}
                  alt="location"
                />
                <input
                  className="CreateGridLocation"
                  placeholder="Event location or Online"
                  type="text"
                  id="location"
                  value={eventLocation}
                  required
                  onChange={(e) => {
                    setEventLocation(e.target.value);
                  }}
                />
              </div>

              {/* Date & time of event */}
              <div className="createGridDate datetimeinput">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />
                <span style={{ whiteSpace: "nowrap" }}>Start Date </span>
                <DateAndTime selectedDate={handleSelectedStartDate} />
              </div>
              <div className="createGridDate datetimeinput">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />
                <span style={{ whiteSpace: "nowrap" }}>End Date </span>
                <DateAndTime selectedDate={handleSelectedEndDate} />
              </div>

              {/* price div */}
              <div id="createPriceDiv">
                <div className="fristDiv">
                  <img
                    src="/assets/icons/dollar.svg"
                    alt="dollar"
                    width={24}
                    height={24}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    className="createPriceInput"
                    disabled={isFree}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label id="freeTicket">Free Ticket</label>
                  <input
                    type="checkbox"
                    id="checkbox"
                    value={isFree}
                    onChange={(e) => {
                      setIsFree((preValue) => {
                        const newValue = !preValue;
                        if (newValue) {
                          setPrice("");
                        }
                        return newValue;
                      });
                    }}
                  />
                </div>
              </div>

              {/* event link  */}
              <div className="createGridDate">
                <img
                  src="/assets/icons/link.svg"
                  alt="link"
                  width={24}
                  height={24}
                />
                <input
                  type="url"
                  placeholder="Event Url"
                  value={eventLink}
                  onChange={(e) => {
                    setEventLink(e.target.value);
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn">
              Create Event
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateEvent;
