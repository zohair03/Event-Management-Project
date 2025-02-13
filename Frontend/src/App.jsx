import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [massage, setMassage] = useState("");


  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/landingPage", { massage })
      .then((res) => {
        console.log("data sended succesfully ",res);
        console.log(massage)
      })
      .catch((err) => {
        console.log("error in sending data to backend ", err);
      });
  }

  function handleChange(event) {
    setMassage(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={massage} onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default App;
