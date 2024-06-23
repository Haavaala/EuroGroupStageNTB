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
        {filteredMatches.length > 0 ? <h1>Group D</h1> : <p></p>}

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
                <div className="matchHeader">
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
                    <div className="homeTeam">
                      <img
                        className="logo"
                        src={match.homeTeam?.logo.url}
                        alt={match.homeTeam?.name}
                      />
                      <p>{match.homeTeam?.name}</p>
                    </div>
                    <p className="result">
                      {match.result.homeScore90} - {match.result.awayScore90}
                      <div className="break">
                        ({match.result.homeScore45} - {match.result.awayScore45}
                        )
                      </div>
                    </p>
                    <div className="awayTeam">
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
                        <p>{match.stadium?.name}</p>
                      </div>
                      <div className="attendance">
                        <Users size={24} />
                        <p>{match.attendance}</p>
                      </div>
                    </div>
                    {match.coveredLive ? (
                      <div className="liveInfo">
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
                  <div className="reporter">
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
