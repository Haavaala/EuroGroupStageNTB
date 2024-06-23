import React, { useEffect } from "react";
import "./DateMenu.css";

function DateMenu({ dates, selectedDate, setSelectedDate }) {
  useEffect(() => {
    // Set the default selected date to the current date if no date is selected
    if (!selectedDate) {
      const today = new Date().toDateString();
      setSelectedDate(today);
    }
  }, [selectedDate, setSelectedDate]);

  return (
    <div className="date-menu">
      {/* <h2>Select Date:</h2> */}
      <div className="theDates">
        {dates.map((date) => (
          <button
            aria-label={date}
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
