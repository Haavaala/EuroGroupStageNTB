import React, { useState, useEffect } from "react";
import "./App.css";
import Group from "./components/Groups/Group";
import DateMenu from "./components/DateMenu/DateMenu";

const groupURLs = {
  A: "https://api.nifs.no/stages/691296/matches/",
  B: "https://api.nifs.no/stages/691297/matches/",
  C: "https://api.nifs.no/stages/691300/matches/",
  D: "https://api.nifs.no/stages/691298/matches/",
  E: "https://api.nifs.no/stages/691299/matches/",
  F: "https://api.nifs.no/stages/691301/matches/",
};

function App() {
  const [groupData, setGroupData] = useState({});
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const sortDates = (datesArray) => {
    return datesArray.sort((a, b) => new Date(a) - new Date(b));
  };

  useEffect(() => {
    const fetchGroupData = async (group, url) => {
      const res = await fetch(url);
      const data = await res.json();
      setGroupData((prevData) => ({ ...prevData, [group]: data }));
      const uniqueDates = Array.from(
        new Set(data.map((match) => new Date(match.timestamp).toDateString()))
      );
      setDates((prevDates) =>
        sortDates(Array.from(new Set([...prevDates, ...uniqueDates])))
      );
    };

    for (const [group, url] of Object.entries(groupURLs)) {
      fetchGroupData(group, url);
    }
  }, []);

  return (
    <>
      <main>
        <div>
          <DateMenu
            dates={dates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          {Object.entries(groupURLs).map(([group]) => (
            <Group
              key={group}
              groupName={`Group ${group}`}
              matches={groupData[group] || []}
              selectedDate={selectedDate}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
