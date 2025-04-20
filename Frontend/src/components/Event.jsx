import { useNavigate } from "react-router-dom";
import { apiPrivate } from "../api/axios.js";

const Event = ({ id, name, location, description, organizer, edit, isDeleted }) => {
  const navigate = useNavigate();
  
  const handleUpdate = () => {
    navigate("/updateEvent", { state: { id, name, location, description } });
  };

  const handleDelete = async () => {
    try {
      const response = await apiPrivate.post("/api/event/deleteEvent", {
        _id: id,
        name: name,
      });

      isDeleted(id)
    } catch (err) {
      console.log(`error in deleting event ${name}`, err);
    }
  };

  return (
    <div className="card">
      <h1>{name}</h1>
      <p>location: {location}</p>
      <p>description: {description}</p>
      <p>organizer: {organizer}</p>
      {edit && (
        <div>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Event;
