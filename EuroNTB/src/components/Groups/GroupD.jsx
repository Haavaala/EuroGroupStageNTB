import { useEffect, useState } from "react";
import { MapPin, Users, Tv, Timer } from "lucide-react";
import "./Groups.css";

function GroupD({ matches, selectedDate }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Filter matches by selected date
  const filteredMatches = selectedDate
    ? matches.filter(
        (match) => new Date(match.timestamp).toDateString() === selectedDate
      )
    : matches;

  return (
    <div>
      <div className="matches">
        {filteredMatches.length > 0 ? <h1 tabIndex={0}>Group D</h1> : <p></p>}

        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => {
            // Check if match is ongoing based on current time
            const matchTime = new Date(match.timestamp);
            const isEnded = match.liveFeeds?.some((feed) => feed.ended);
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
                {/* Header section of the scoreboard */}
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
                {/* Information about the whole game */}
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
                  {/* Information about stadium and livefeed */}
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
                  {/* The reporter of the match */}
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

export default GroupD;
