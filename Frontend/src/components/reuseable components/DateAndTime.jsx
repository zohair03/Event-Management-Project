import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateAndTime = ({ selectedDate }) => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        showTimeSelect
        minTime={new Date(0, 0, 0, 12, 30)}
        maxTime={new Date(0, 0, 0, 19, 0)}
        selected={date}
        onChange={(date) => {
          setDate(date);
          selectedDate(date);
        }}
        dateFormat="E, MMMM d, yyyy, h:mm aa"
      />
    </div>
  );
};

export default DateAndTime;
