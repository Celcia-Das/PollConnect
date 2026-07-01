const express = require("express");
const Poll = require("../models/Poll");
const Response = require("../models/Response");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find();

    const totalPolls = polls.length;
    const totalResponses = await Response.countDocuments();

    const chartData = [];

    for (const poll of polls) {
      const responseCount = await Response.countDocuments({
        pollId: poll._id,
      });

      chartData.push({
        title: poll.title,
        responses: responseCount,
      });
    }

    res.json({
      success: true,
      totalPolls,
      activePolls: totalPolls,
      closedPolls: 0,
      totalResponses,
      chartData,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard analytics",
    });
  }
});

module.exports = router;