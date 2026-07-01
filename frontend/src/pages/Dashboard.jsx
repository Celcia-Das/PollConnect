import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/UI/StatCard";
import Layout from "../components/Layout/Layout";
import "./Dashboard.css";
import API_URL from "../config/api";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalPolls: 0,
    activePolls: 0,
    closedPolls: 0,
    totalResponses: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${API_URL}/api/polls`);
      const data = await response.json();

      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="dashboard-page">
        <h1 className="dashboard-title">
          📊 PollConnect Dashboard
        </h1>

        <div className="stats-grid">
          <StatCard
            icon="🗳️"
            title="Total Polls"
            value={stats.totalPolls}
          />

          <StatCard
            icon="🟢"
            title="Active Polls"
            value={stats.activePolls}
          />

          <StatCard
            icon="🔴"
            title="Closed Polls"
            value={stats.closedPolls}
          />

          <StatCard
            icon="👥"
            title="Responses"
            value={stats.totalResponses}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={buttonStyle}
            onClick={() => navigate("/create-poll")}
          >
            ➕ Create Poll
          </button>

          <button
            style={buttonStyle}
            onClick={() => navigate("/manage-polls")}
          >
            📋 Manage Polls
          </button>

          <button
  style={buttonStyle}
  onClick={() => navigate("/analytics")}
>
  📈 View Analytics
</button>
        </div>
      </div>
    </Layout>
  );
}

const buttonStyle = {
  background: "var(--primary)",
  color: "white",
  border: "none",
  padding: "14px 22px",
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.25s",
};

export default Dashboard;