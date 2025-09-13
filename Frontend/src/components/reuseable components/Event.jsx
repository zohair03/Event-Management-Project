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
    navigate(`/events/${id}/${category}`, {
      state: { id, category },
    });
    isClicked();
  };

  const handleGetOrders = async () => {
    navigate("/orders");
  };

  return (
    <div className="card">
      <div className="cardImg">
        <a href="">
          <img src={img} alt="event banner" onClick={handleClick} />
        </a>
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
          <div className="btn btnPrice">{free ? "Free" : `RM ${price}`}</div>
          <div className="btn btnGenera">{category}</div>
        </div>
        <span className="cardTime">{startDate}</span>
        <h4 className="cardTitle" onClick={handleClick}>
          <a href="">{name}</a>
        </h4>
        <div className="cardHostName">
          <span id="hostName">{host}</span>
          {edit && (
            <a href="">
              <div onClick={handleGetOrders}>
                <span id="orders">Orders Details</span>
                <img
                  loading="lazy"
                  alt="new page"
                  src="/assets/icons/arrow outward.svg"
                  width="18"
                  height="18"
                />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
