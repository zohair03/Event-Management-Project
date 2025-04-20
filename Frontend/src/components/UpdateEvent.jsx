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
      setResMsg(response.data.massage)
    } catch (err) {
      console.log("error in update api:", err);
    }
  };

  return (
    <>
      <h1>Update event</h1>
      <span>{resMsg}</span>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="eventName">Event Name: </label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => {
            setEventName(e.target.value);
          }}
          required
        />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          value={eventLocation}
          required
          onChange={(e) => {
            setEventLocation(e.target.value);
          }}
        />
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateEvent;
