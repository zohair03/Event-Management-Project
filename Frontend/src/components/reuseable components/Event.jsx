import { useNavigate } from "react-router-dom";
import { apiPrivate } from "../../api/axios.js";
import "./Event.css";

const Event = ({
  id,
  name,
  lastName,
  location,
  description,
  host,
  edit,
  isClicked = () => {},
  isDeleted,
  category,
  img,
  startDate,
  endDate, 
  price,
  free,
  link,
}) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/updateEvent", {
      state: {
        id,
        name,
        location,
        description,
        host,
        img,
        category,
        startDate,
        endDate,
        price,
        free,
        link,
      },
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
      state: { id, category },
    });
    isClicked();
  };

  return (
    <div className="card">
      <div className="cardImg">
        <img src={img} alt="event banner" onClick={handleClick} />
      </div>

      {edit && (
        <div className="cardM">
          <button onClick={handleDelete}>
            <img
              alt="delete"
              loading="lazy"
              width="20"
              height="20"
              style={{ color: "transparent" }}
              src="/assets/icons/delete.svg"
            />
          </button>
          <button onClick={handleUpdate}>
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
          <div className="btn btnPrice">{free ? "Free" : `$${price}`}</div>
          <div className="btn btnGenera">{category}</div>
        </div>
        <span className="cardTime">{startDate}</span>
        <h4 className="cardTitle" onClick={handleClick}>
          {name}
        </h4>
        <div>
          <span>{host}</span>
        </div>
      </div>
    </div>
  );
};

export default Event;
