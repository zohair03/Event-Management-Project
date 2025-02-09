import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [massage, setMassage] = useState("");

  useEffect(() => {
    axios
      .get("/landingPage")
      .then((response) => {
        setMassage(response.data);
      })
      .catch((error) => {
        console.log("FAILED API CALL landingPage ", error);
      });
  });

  return (
    <>
      <p>{massage}</p>
    </>
  );
}

export default App;
