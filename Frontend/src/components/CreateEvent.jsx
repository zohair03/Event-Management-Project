import useApiPrivate from "../Hooks/useApiPrivate.jsx";
import { useState } from "react";
import useAuth from "../Hooks/useAuth.jsx";

const CreateEvent = () => {
  const apiPrivate = useApiPrivate();
  const { auth } = useAuth();

  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [description, setDescription] = useState("");
  const [resMsg, setResMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPrivate.post("/api/event/createEvent", {
        name: eventName,
        location: eventLocation,
        description: description,
        organizer: auth.user.name,
        email: auth.user.email,
      });
      setResMsg(response.data.massage);
      if (response.statusText === "OK") {
        setEventName("");
        setEventLocation("");
        setDescription("");
      }
    } catch (err) {
      console.log("error in api call", err);
      setResMsg(err.message)
    }
  };

  return (
    <>
      <h1>Create events</h1>
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
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default CreateEvent;
