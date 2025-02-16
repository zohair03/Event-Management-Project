import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";
import CreateEvent from "./components/CreateEvent";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import UpdateEvent from "./components/UpdateEvent";
import {createBrowserRouter , RouterProvider} from 'react-router'

function App() {
  
  const [newUser, setNewUser] = useState({
    name: "",
    userName: "",
    password: "",
    email: ""
  });

  const [newEvent, setNewEvent] = useState({
    name:"",
    location:"",
    description:""
  })


  function handleSubmit(event) {
    event.preventDefault();

    // console.log({newUser})

    axios
      .post("http://localhost:3000/api/event/createEvent", newEvent)
      .then((res) => {
        console.log("data sended succesfully ", newEvent);
        setNewEvent({ name: "", location: "", description: ""});
      })
      .catch((err) => {
        console.log("error in sending data to backend ", err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          name
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleChange}
          />
        </label>
        <label>
          location
          <input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleChange}
          />
        </label>
        <label>
          description
          <input
            type="text"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
