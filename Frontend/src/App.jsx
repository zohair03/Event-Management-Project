import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  
  const [newUser, setNewUser] = useState({
    name: "",
    userName: "",
    password: "",
    email: ""
  });

  function handleSubmit(event) {
    event.preventDefault();

    // console.log({newUser})

    axios
      .post("http://localhost:3000/landingPage", newUser)
      .then((res) => {
        console.log("data sended succesfully ", newUser);
        setNewUser({ name: "", userName: "", password: "", email: "" });
      })
      .catch((err) => {
        console.log("error in sending data to backend ", err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
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
            value={newUser.name}
            onChange={handleChange}
          />
        </label>
        <label>
          User Name
          <input
            type="text"
            name="userName"
            value={newUser.userName}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
