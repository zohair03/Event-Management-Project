import useApiPrivate from "../../Hooks/useApiPrivate.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth.jsx";

const UpdateEvent = () => {
  const apiPrivate = useApiPrivate();
  const { auth } = useAuth();
  const location = useLocation();
  const event = location.state;

  const [id, setId] = useState(event?.id);
  const [eventName, setEventName] = useState(event?.name);
  const [eventLocation, setEventLocation] = useState(event?.location);
  const [description, setDescription] = useState(event?.description);
  const [banner, setBanner] = useState(event?.img);
  const [category, setcategory] = useState(event?.category);
  const [startDate, setStartDate] = useState(event?.startDate);
  const [startTime, setStartTime] = useState(event?.startTime);
  const [endDate, setEndDate] = useState(event?.endDate);
  const [endTime, setEndTime] = useState(event?.endTime);
  const [price, setPrice] = useState(event?.price);
  const [isFree, setIsFree] = useState(event?.free);
  const [eventLink, setEventLink] = useState(event?.link);
  const [resMsg, setResMsg] = useState("");

  const updatedEvent = {
    _id: id,
    name: eventName,
    location: eventLocation,
    description: description,
    host: auth.user.name,
    email: auth.user.email,
    banner: banner,
    category: category,
    startDate: startDate,
    startTime: startTime,
    endDate: endDate,
    endTime: endTime,
    price: price,
    free: isFree,
    link: eventLink,
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "EventBanners");
    data.append("cloud_name", "dxtg6bwyq");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxtg6bwyq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImgUrl = await response.json();
    setBanner(uploadedImgUrl.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPrivate.patch(
        "/api/event/updateEvent",
        updatedEvent
      );
      setResMsg(response.data.massage);
    } catch (err) {
      console.log("error in update api:", err);
    }
  };

  return (
    <>
      <section className="headingSection">
        <div>
          <h1>Update Event</h1>
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
              <input
                type="text"
                placeholder="Category"
                id="category"
                value={category}
                required
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
              />

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
              <div className="dropbox">
                <input
                  type="file"
                  onChange={handleFileUpload}
                />
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
              <div className="createGridDate">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />
                <input
                  type="date"
                  value={startDate}
                  placeholder="Start Date"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
                <input
                  type="time"
                  value={startTime}
                  placeholder="Start Time"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </div>
              <div className="createGridDate">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />
                <input
                  type="date"
                  value={endDate}
                  placeholder="End Date"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
                <input
                  type="time"
                  value={endTime}
                  placeholder="End Time"
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                />
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
                    checked={isFree ? true : false}
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

export default UpdateEvent;
