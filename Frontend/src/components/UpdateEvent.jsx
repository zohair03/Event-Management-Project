import useApiPrivate from "../Hooks/useApiPrivate.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const UpdateEvent = () => {
  const apiPrivate = useApiPrivate();
  const location = useLocation();
  const event = location.state;

  const [eventName, setEventName] = useState(event?.name);
  const [eventLocation, setEventLocation] = useState(event?.location);
  const [description, setDescription] = useState(event?.description);
  const [resMsg, setResMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPrivate.patch("/api/event/updateEvent", {
        _id: event?.id,
        name: eventName,
        location: eventLocation,
        description: description,
      });
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
              <input type="text" />
              <textarea
                className="description"
                placeholder="description"
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>

              <div className="dropbox">
                <div>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    multiple=""
                    tabindex="-1"
                  />
                  <div>
                    <img
                      src="/assets/icons/upload.svg"
                      width="77"
                      height="77"
                      alt="file upload"
                    />
                    <h3>Drag photo here</h3>
                    <p>SVG, PNG, JPG</p>
                    <button type="button">Select from computer</button>
                    <div>Drop files here!</div>
                  </div>
                </div>
              </div>

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
              <div className="createGridDate">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />
                <input type="date" placeholder="Start Date" />
              </div>
              <div className="createGridDate">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />
                <input type="date" placeholder="End Date" />
              </div>

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
                    className="createPriceInput"
                  />
                </div>
                <div>
                  <label id="freeTicket">Free Ticket</label>
                  <input type="checkbox" id="checkbox" />
                </div>
              </div>

              <div className="createGridDate">
                <img
                  src="/assets/icons/link.svg"
                  alt="link"
                  width={24}
                  height={24}
                />
                <input type="url" placeholder="Event Url" />
              </div>
            </div>
            <button type="submit" className="btn">
              Update Event
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateEvent;
