const express = require("express");
const Response = require("../models/Response");

const router = express.Router();

// Submit a Response
router.post("/", async (req, res) => {
  try {
    const { pollId, answer, name } = req.body;

    const newResponse = new Response({
      pollId,
      answer,
      name: name || "Anonymous",
    });

    const savedResponse = await newResponse.save();

    res.status(201).json({
      success: true,
      message: "Response submitted successfully!",
      response: savedResponse,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit response",
    });
  }
});
// Get Analytics for a Poll
router.get("/:pollId", async (req, res) => {
  try {
    const responses = await Response.find({
      pollId: req.params.pollId,
    });

    const results = {};

    responses.forEach((response) => {
      if (results[response.answer]) {
        results[response.answer]++;
      } else {
        results[response.answer] = 1;
      }
    });

    res.json({
      success: true,
      totalResponses: responses.length,
      results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
});

module.exports = router;