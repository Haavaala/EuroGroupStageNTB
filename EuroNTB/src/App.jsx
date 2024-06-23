import { useState, useEffect } from "react";
import "./App.css";
import MatchList from "./components/MatchList/MatchList";
import DateMenu from "./components/DateMenu/DateMenu";

// URLs for the different groups
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

  // Sort the dates in ascending order
  const sortDates = (datesArray) =>
    datesArray.sort((a, b) => new Date(a) - new Date(b));

  // Fetch the data for each group and set the state
  useEffect(() => {
    const fetchGroupData = async (group, url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setGroupData((prevData) => ({ ...prevData, [group]: data }));

        const uniqueDates = Array.from(
          new Set(data.map((match) => new Date(match.timestamp).toDateString()))
        );
        setDates((prevDates) =>
          sortDates(Array.from(new Set([...prevDates, ...uniqueDates])))
        );
      } catch (error) {
        console.error(`Failed to fetch data for group ${group}:`, error);
      }
    };

    Object.entries(groupURLs).forEach(([group, url]) =>
      fetchGroupData(group, url)
    );
  }, []);

  return (
    <main>
      <h1>Euro 2024 Group Stage</h1>
      <DateMenu
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {Object.keys(groupURLs).map((group) => (
        <MatchList
          key={group}
          groupName={`Group ${group}`}
          matches={groupData[group] || []}
          selectedDate={selectedDate}
        />
      ))}
    </main>
  );
}

export default App;
