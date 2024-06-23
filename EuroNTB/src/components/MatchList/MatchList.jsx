/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MapPin, Users, Tv, Timer } from "lucide-react";
import "./MatchList.css";

function Group({ groupName, matches, selectedDate }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  //   Update the time to see if there are any ongoing matches every minute, if there are, the match will be marked as ongoing
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  //   Show only the matches from the selected date
  const filteredMatches = selectedDate
    ? matches.filter(
        (match) => new Date(match.timestamp).toDateString() === selectedDate
      )
    : matches;

  return (
    <div>
      <div className="matches">
        {/* Checking if there are any matches in the group, if there is, display the group name */}
        {/* Tabindex is to make it focusable, Aria-label is to make it accessible for screen readers  */}
        {filteredMatches.length > 0 ? (
          <h2 tabIndex={0}>{groupName}</h2>
        ) : (
          <p></p>
        )}

        {/* Only display the matches from the selected date if there are any  */}
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => {
            const matchTime = new Date(match.timestamp);
            // See if the match has ended
            const isEnded = match.liveFeeds?.some((feed) => feed.ended);
            // See if the match is ongoing, (If the match starting time is the same as the current time and 90 minutes from the starting time)
            const isOngoing =
              !isEnded &&
              currentTime >= matchTime &&
              currentTime <= new Date(matchTime.getTime() + 90 * 60000);

            return (
              <div
                className={`oneMatch ${
                  isEnded ? "ended" : isOngoing ? "ongoing" : ""
                }`}
                key={match.id}
              >
                {/* The scoreboard header with the status of the match and which round */}
                <div className="matchHeader" tabIndex={0}>
                  <p className="when">
                    <Timer />
                    {isEnded
                      ? "Finished"
                      : isOngoing
                      ? "Ongoing"
                      : matchTime.toLocaleString()}
                  </p>
                  <p>Round: {match.round}</p>
                </div>
                {/* Display the teams and the result of the match */}
                <div className="wholeMatch">
                  <div className="teams">
                    <div
                      className="homeTeam"
                      tabIndex={0}
                      aria-label={match.homeTeam?.name}
                    >
                      <img
                        className="logo"
                        src={match.homeTeam?.logo.url}
                        alt={match.homeTeam?.name}
                      />
                      <p>{match.homeTeam?.name}</p>
                    </div>
                    <p
                      className="result"
                      tabIndex={0}
                      aria-label={`Final score: ${match.result.homeScore90} - ${match.result.awayScore90}`}
                    >
                      {match.result.homeScore90} - {match.result.awayScore90}
                      <div
                        className="break"
                        tabIndex={0}
                        aria-label={`half time score: ${match.result.homeScore45} - ${match.result.awayScore45}`}
                      >
                        ({match.result.homeScore45} - {match.result.awayScore45}
                        )
                      </div>
                    </p>
                    <div
                      className="awayTeam"
                      tabIndex={0}
                      aria-label={match.awayTeam?.name}
                    >
                      <img
                        className="logo"
                        src={match.awayTeam?.logo.url}
                        alt={match.awayTeam?.name}
                      />
                      <p>{match.awayTeam?.name}</p>
                    </div>
                  </div>
                  <hr />
                  {/* Displaying the stadium, attendance, TV channel and reporter */}
                  <div className="matchInfo">
                    <div className="stadiumInfo">
                      <div className="stadium">
                        <MapPin />
                        <p
                          tabIndex={0}
                          aria-label={`Stadium: ${match.stadium?.name}`}
                        >
                          {match.stadium?.name}
                        </p>
                      </div>
                      <div className="attendance">
                        <Users size={24} />
                        <p
                          tabIndex={0}
                          aria-label={`Attendance: ${match.attendance}`}
                        >
                          {match.attendance}
                        </p>
                      </div>
                    </div>
                    {match.coveredLive ? (
                      <div
                        className="liveInfo"
                        tabIndex={0}
                        aria-label={`TV channel: ${match.tvChannels
                          ?.map((channel) => channel.name)
                          .join(", ")}`}
                      >
                        <>
                          <Tv />
                          <p>
                            {match.tvChannels
                              ?.map((channel) => channel.name)
                              .join(", ")}
                          </p>
                        </>
                      </div>
                    ) : null}
                  </div>
                  <hr />
                  <div
                    className="reporter"
                    tabIndex={0}
                    aria-label={`Reporter: ${match.liveFeeds
                      ?.map((feed) => feed.user.name)
                      .join(", ")}}`}
                  >
                    Reporter:{" "}
                    {match.liveFeeds ? (
                      <p>
                        {match.liveFeeds
                          ?.map((feed) => feed.user.name)
                          .join(", ")}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Group;
