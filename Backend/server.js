const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const pollRoutes = require("./routes/pollRoutes");
const responseRoutes = require("./routes/responseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/polls", (req, res, next) => {
  console.log("🔥 Request reached /api/polls");
  next();
});

app.use("/api/polls", pollRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 PollConnect Backend is Running!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});