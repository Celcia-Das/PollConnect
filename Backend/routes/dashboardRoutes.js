const express = require("express");
const Poll = require("../models/Poll");
const Response = require("../models/Response");

const router = express.Router();

// Dashboard Statistics
router.get("/", async (req, res) => {
  try {
    const totalPolls = await Poll.countDocuments();
    const totalResponses = await Response.countDocuments();

    res.json({
      success: true,
      totalPolls,
      activePolls: totalPolls,
      closedPolls: 0,
      totalResponses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
});

module.exports = router;