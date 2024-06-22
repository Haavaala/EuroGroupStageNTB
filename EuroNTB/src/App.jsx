import React, { useState, useEffect } from "react";
import "./App.css";
import GroupA from "./Groups/GroupA";
import GroupB from "./Groups/GroupB";
import DateMenu from "./components/DateMenu/DateMenu";
import GroupC from "./Groups/GroupC";

function App() {
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [groupC, setGroupC] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  //Group A
  useEffect(() => {
    fetch("https://api.nifs.no/stages/691296/matches/")
      .then((res) => res.json())
      .then((data) => {
        setGroupA(data);
        const uniqueDatesA = Array.from(
          new Set(data.map((match) => new Date(match.timestamp).toDateString()))
        );
        setDates((prevDates) =>
          Array.from(new Set([...prevDates, ...uniqueDatesA]))
        );
      });
  }, []);

  //Group B
  useEffect(() => {
    fetch("https://api.nifs.no/stages/691297/matches/")
      .then((res) => res.json())
      .then((data) => {
        setGroupB(data);
        const uniqueDatesB = Array.from(
          new Set(data.map((match) => new Date(match.timestamp).toDateString()))
        );
        setDates((prevDates) =>
          Array.from(new Set([...prevDates, ...uniqueDatesB]))
        );
      });
  }, []);

  //Group C
  useEffect(() => {
    fetch("https://api.nifs.no/stages/691300/matches/")
      .then((res) => res.json())
      .then((data) => {
        setGroupC(data);
        const uniqueDatesC = Array.from(
          new Set(data.map((match) => new Date(match.timestamp).toDateString()))
        );
        setDates((prevDates) =>
          Array.from(new Set([...prevDates, ...uniqueDatesC]))
        );
      });
  }, []);

  return (
    <div>
      <DateMenu
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <GroupA matches={groupA} selectedDate={selectedDate} />
      <GroupB matches={groupB} selectedDate={selectedDate} />
      <GroupC matches={groupC} selectedDate={selectedDate} />
    </div>
  );
}

export default App;
