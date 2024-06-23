import React, { useState, useEffect } from "react";
import "./App.css";
import GroupA from "./components/Groups/GroupA";
import GroupB from "./components/Groups/GroupB";
import DateMenu from "./components/DateMenu/DateMenu";
import GroupC from "./components/Groups/GroupC";
import GroupD from "./components/Groups/GroupD";
import GroupE from "./components/Groups/GroupE";
import GroupF from "./components/Groups/GroupF";

function App() {
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [groupC, setGroupC] = useState([]);
  const [groupD, setGroupD] = useState([]);
  const [groupE, setGroupE] = useState([]);
  const [groupF, setGroupF] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  //Functions for sorting the dates
  const sortDates = (datesArray) => {
    return datesArray.sort((a, b) => new Date(a) - new Date(b));
  };

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
          sortDates(Array.from(new Set([...prevDates, ...uniqueDatesA])))
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
          sortDates(Array.from(new Set([...prevDates, ...uniqueDatesB])))
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
          sortDates(Array.from(new Set([...prevDates, ...uniqueDatesC])))
        );
      });
  }, []);

  //Group D
  useEffect(() => {
    fetch("https://api.nifs.no/stages/691298/matches/")
      .then((res) => res.json())
      .then((data) => {
        setGroupD(data);
        const uniqueDatesD = Array.from(
          new Set(data.map((match) => new Date(match.timestamp).toDateString()))
        );
        setDates((prevDates) =>
          sortDates(Array.from(new Set([...prevDates, ...uniqueDatesD])))
        );
      });
  }, []);

  //Group E
  useEffect(() => {
    fetch("https://api.nifs.no/stages/691299/matches/")
      .then((res) => res.json())
      .then((data) => {
        setGroupE(data);
        const uniqueDatesE = Array.from(
          new Set(data.map((match) => new Date(match.timestamp).toDateString()))
        );
        setDates((prevDates) =>
          sortDates(Array.from(new Set([...prevDates, ...uniqueDatesE])))
        );
      });
  }, []);

  //Group F
  useEffect(() => {
    fetch("https://api.nifs.no/stages/691301/matches/")
      .then((res) => res.json())
      .then((data) => {
        setGroupF(data);
        const uniqueDatesF = Array.from(
          new Set(data.map((match) => new Date(match.timestamp).toDateString()))
        );
        setDates((prevDates) =>
          sortDates(Array.from(new Set([...prevDates, ...uniqueDatesF])))
        );
      });
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
          <GroupA matches={groupA} selectedDate={selectedDate} />
          <GroupB matches={groupB} selectedDate={selectedDate} />
          <GroupC matches={groupC} selectedDate={selectedDate} />
          <GroupD matches={groupD} selectedDate={selectedDate} />
          <GroupE matches={groupE} selectedDate={selectedDate} />
          <GroupF matches={groupF} selectedDate={selectedDate} />
        </div>
      </main>
    </>
  );
}

export default App;
