import React, { useEffect, useState } from "react";
import "./Groups.css";

function GroupA() {
  const [groupA, setGroupA] = useState([]);

  //If ended = true, gjør noe

  //Fetching the data from the api
  useEffect(() => {
    fetch("https://api.nifs.no/stages/691296/matches/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setGroupA(data);
      });
  }, []);

  useEffect(() => {
    console.log("Updated groupA state:", groupA);
  }, [groupA]);

  return (
    <div>
      <h1>Group A</h1>
      <div className="matches">
        {groupA.length > 0 ? (
          groupA.map((match) => (
            <div
              className="oneMatch"
              key={match.id}
              style={{
                border: "1px solid black",
                margin: "10px",
                padding: "10px",
              }}
            >
              <p>Date: {new Date(match.timestamp).toLocaleString()}</p>
              <div className="teams">
                <div className="homeTeam">
                  <p>{match.homeTeam?.name}</p>
                  <img
                    className="logo"
                    src={match.homeTeam?.logo.url}
                    alt={match.homeTeam?.name}
                  />
                </div>
                <div className="awayTeam">
                  <p>{match.awayTeam?.name}</p>
                  <img
                    className="logo"
                    src={match.awayTeam?.logo.url}
                    alt={match.awayTeam?.name}
                  />
                </div>
              </div>
              <p>
                Result: {match.result.homeScore90} - {match.result.awayScore90}{" "}
                {""}({match.result.homeScore45} - {match.result.awayScore45})
              </p>
              <p>Stadium: {match.stadium?.name}</p>
              <p>Attendance: {match.attendance}</p>
              <p>Round: {match.round}</p>
              {match.coveredLive ? (
                <p>
                  TV Channels:{" "}
                  {match.tvChannels?.map((channel) => channel.name).join(", ")}
                </p>
              ) : null}
              <p>
                {match.homeTeam.clubs?.map((name) => name.teamPhoto).join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default GroupA;
