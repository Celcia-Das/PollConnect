import "./Results.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../config/api";

function Results() {
  const { id } = useParams();

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
       `${API_URL}/api/responses/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!analytics) {
    return (
      <div className="results-loading">
        Loading Results...
      </div>
    );
  }

  const winner = Object.entries(analytics.results).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="results-page">

      <div className="results-card">

        <span className="results-badge">
          Live Analytics
        </span>

        <h1>Poll Results</h1>

        <div className="total-votes">
          Total Responses
          <span>{analytics.totalResponses}</span>
        </div>

        {Object.entries(analytics.results).map(([option, votes]) => {

          const percentage =
            analytics.totalResponses === 0
              ? 0
              : (votes / analytics.totalResponses) * 100;

          return (
            <div
              key={option}
              className="result-item"
            >
              <div className="result-header">

                <strong>{option}</strong>

                <span>
                  {votes} vote{votes !== 1 ? "s" : ""}
                </span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <small>
                {percentage.toFixed(1)}%
              </small>

            </div>
          );

        })}

        <div className="winner-box">

          🏆 Winner

          <h2>
            {winner ? winner[0] : "No votes yet"}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default Results;