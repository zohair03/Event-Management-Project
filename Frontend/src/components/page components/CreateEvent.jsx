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
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
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
    console.log("category: ", category);
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
      setResMsg(err.message);
    }
  };

  const handleSelectedCategory = (selectedCategory) => {
    console.log("selected C:", selectedCategory);
    setcategory(selectedCategory);
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
              <FileUpload />

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

                <span style={{ "white-space": "nowrap" }}>Start Date </span>
                <DateAndTime />
              </div>
              <div className="createGridDate datetimeinput">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />

                <span style={{ "white-space": "nowrap" }}>End Date </span>
                <DateAndTime />
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
