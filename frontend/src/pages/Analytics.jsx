import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Analytics.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#8B5CF6",
  "#A78BFA",
  "#C4B5FD",
  "#DDD6FE",
  "#7C3AED",
  "#6D28D9",
];

function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/analytics"
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
      <Layout>
        <h2>Loading Analytics...</h2>
      </Layout>
    );
  }

  const averageResponses =
    analytics.totalPolls === 0
      ? 0
      : (
          analytics.totalResponses /
          analytics.totalPolls
        ).toFixed(1);

  const mostPopular =
    analytics.chartData.length > 0
      ? [...analytics.chartData].sort(
          (a, b) => b.responses - a.responses
        )[0]
      : null;

  return (
    <Layout>
      <h1 className="analytics-title">
        📈 Analytics Dashboard
      </h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{analytics.totalPolls}</h2>
          <p>Total Polls</p>
        </div>

        <div className="stat-card">
          <h2>{analytics.totalResponses}</h2>
          <p>Total Responses</p>
        </div>

        <div className="stat-card">
          <h2>{averageResponses}</h2>
          <p>Average Responses</p>
        </div>

        <div className="stat-card">
          <h2>{mostPopular ? mostPopular.title : "N/A"}</h2>
          <p>Most Popular Poll</p>
        </div>
      </div>

      {/* Bar Chart */}

      <div className="chart-card">
        <h2>📊 Responses Per Poll</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={analytics.chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="title" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="responses"
              fill="#8B5CF6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}

      <div className="chart-card">
        <h2>🥧 Poll Response Distribution</h2>

        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={analytics.chartData}
              dataKey="responses"
              nameKey="title"
              cx="50%"
              cy="50%"
              outerRadius={140}
              label
            >
              {analytics.chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}

export default Analytics;