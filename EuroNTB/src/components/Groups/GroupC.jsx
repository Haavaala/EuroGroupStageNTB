import { MapPin, Users, Tv } from "lucide-react";
import "./Groups.css";

function GroupC({ matches, selectedDate }) {
  // Filter matches by selected date
  const filteredMatches = selectedDate
    ? matches.filter(
        (match) => new Date(match.timestamp).toDateString() === selectedDate
      )
    : matches;

  return (
    <div>
      <div className="matches">
        {filteredMatches.length > 0 ? <h1>Group C</h1> : <p></p>}

        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <div className="oneMatch" key={match.id}>
              <div className="matchHeader">
                <p>{new Date(match.timestamp).toLocaleString()}</p>
                <p>Round: {match.round}</p>
              </div>
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
                      ({match.result.homeScore45} - {match.result.awayScore45})
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
                <div className="reporter">
                  Reporter:{" "}
                  {match.liveFeeds ? (
                    <p>{match.liveFeeds?.map((user) => user.user.name)}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default GroupC;
