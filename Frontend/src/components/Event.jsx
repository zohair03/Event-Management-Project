import React from "react";

const Event = ({ name, location, description }) => {
  return (
    <div className="card">
      <h1>{name}</h1>
      <p>location: {location}</p>
      <p>description: {description}</p>
    </div>
  );
};

export default Event;