const Poll = require("../models/Poll");
const Response = require("../models/Response");

const getAnalytics = async (req, res) => {
  try {
    const polls = await Poll.find();
    const responses = await Response.find();

    const chartData = polls.map((poll) => {
      const totalResponses = responses.filter(
        (response) => response.pollId.toString() === poll._id.toString()
      ).length;

      return {
        pollId: poll._id,
        title: poll.title,
        responses: totalResponses,
      };
    });

    res.json({
      success: true,
      totalPolls: polls.length,
      totalResponses: responses.length,
      chartData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAnalytics,
};