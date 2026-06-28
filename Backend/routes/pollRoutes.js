const express = require("express");
const Poll = require("../models/Poll");

const router = express.Router();

// Get All Polls
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      polls,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch polls",
    });
  }
});
// Create Poll
router.post("/", async (req, res) => {
  console.log("🔥 POST /api/polls called");
console.log(req.body);
  try {
    const { title, description, question, options } = req.body;

    const newPoll = new Poll({
      title,
      description,
      question,
      options,
    });

    const savedPoll = await newPoll.save();
    console.log("✅ Poll saved to MongoDB");
console.log(savedPoll);

    res.status(201).json({
      success: true,
      message: "Poll saved successfully!",
      poll: savedPoll,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save poll",
    });
  }
});
// Get Single Poll
router.get("/:id", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    res.json({
      success: true,
      poll,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching poll",
    });
  }
});
// Delete Poll
router.delete("/:id", async (req, res) => {
  try {
    await Poll.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Poll deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete poll",
    });
  }
});
// Update Poll
router.put("/:id", async (req, res) => {
  try {
    const { title, description, question, options } = req.body;

    const updatedPoll = await Poll.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        question,
        options,
      },
      {
        new: true,
      }
    );

    if (!updatedPoll) {
      return res.status(404).json({
        success: false,
        message: "Poll not found",
      });
    }

    res.json({
      success: true,
      message: "Poll updated successfully!",
      poll: updatedPoll,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update poll",
    });
  }
});

module.exports = router;