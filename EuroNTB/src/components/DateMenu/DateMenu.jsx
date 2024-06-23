import React from "react";
import "./DateMenu.css";

function DateMenu({ dates, selectedDate, setSelectedDate }) {
  return (
    <div className="date-menu">
      {/* <h2>Select Date:</h2> */}
      <div className="theDates">
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
    </div>
  );
}

export default DateMenu;
