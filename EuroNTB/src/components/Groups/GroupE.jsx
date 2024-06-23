import React from "react";
import "./Groups.css";

function GroupE({ matches, selectedDate }) {
  // Filter matches by selected date
  const filteredMatches = selectedDate
    ? matches.filter(
        (match) => new Date(match.timestamp).toDateString() === selectedDate
      )
    : matches;

  return (
    <div>
      <div className="matches">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <div className="oneMatch" key={match.id}>
              <h1>Group E</h1>
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
                ({match.result.homeScore45} - {match.result.awayScore45})
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
              {match.liveFeeds ? (
                <p>{match.liveFeeds?.map((user) => user.user.name)}</p>
              ) : null}
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default GroupE;
