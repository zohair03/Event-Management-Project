import { Navigate, useNavigate } from "react-router-dom";
import { apiPrivate } from "../api/axios.js";

const Event = ({
  id,
  name,
  location,
  description,
  organizer,
  edit,
  isDeleted,
  img,
}) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/updateEvent", {
      state: { id, name, location, description, organizer, img },
    });
  };

  const handleDelete = async () => {
    try {
      const response = await apiPrivate.post("/api/event/deleteEvent", {
        _id: id,
        name: name,
      });
      isDeleted(id);
    } catch (err) {
      console.log(`error in deleting event ${name}`, err);
    }
  };

  const handleClick = () => {
    navigate(`/events/${id}`, {
      state: { id, name, location, description, organizer, img },
    });
  };

  return (
    <div className="card">
      <img className="cardImg" src={img} alt="london" onClick={handleClick} />

      {edit && (
        <div className="cardM">
          <button className="" onClick={handleDelete}>
            <img
              alt="delete"
              loading="lazy"
              width="20"
              height="20"
              style={{ color: "transparent" }}
              src="/assets/icons/delete.svg"
            />
          </button>
          <button className="" onClick={handleUpdate}>
            <img
              alt="edit "
              loading="lazy"
              width="20"
              height="20"
              style={{ color: "transparent" }}
              src="/assets/icons/edit.svg"
            />
          </button>
        </div>
      )}

      <div className="cardDetails">
        <div className="cardPrice">
          <div className="btn btnPrice">$100</div>
          <div className="btn btnGenera">London</div>
        </div>
        <span className="cardTime">Sat, Mar 16, 1:17 PM</span>
        <h4 className="cardTitle" onClick={handleClick}>
          {name}
        </h4>
        <div>
          <span>{organizer}</span>
        </div>
      </div>
    </div>
  );
};

export default Event;
