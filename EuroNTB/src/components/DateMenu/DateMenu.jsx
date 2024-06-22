import React from "react";
import "./DateMenu.css";

function DateMenu({ dates, selectedDate, setSelectedDate }) {
  return (
    <div className="date-menu">
      <h2>Select Date:</h2>
      {dates.map((date) => (
        <button
          key={date}
          onClick={() => setSelectedDate(date)}
          className={selectedDate === date ? "active" : ""}
        >
          {date}
        </button>
      ))}
    </div>
  );
}

export default DateMenu;
