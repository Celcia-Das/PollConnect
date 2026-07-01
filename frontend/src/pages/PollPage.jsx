import "./PollPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../config/api";

function PollPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetchPoll();
  }, []);

  const fetchPoll = async () => {
    try {
      const response = await fetch(
       `${API_URL}/api/polls/${id}`
      );

      const data = await response.json();
      setPoll(data.poll);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert("Please select an option.");
      return;
    }

    try {
      const response = await fetch(
       `${API_URL}/api/polls`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pollId: id,
            answer: selectedAnswer,
            name,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        navigate("/thank-you");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit response.");
    }
  };

  if (!poll) {
    return (
      <div className="poll-loading">
        Loading Poll...
      </div>
    );
  }

  return (
    <div className="poll-page">

      <div className="poll-card">

        <span className="poll-badge">
          Live Poll
        </span>

        <h1>{poll.title}</h1>

        <p className="poll-description">
          {poll.description}
        </p>

        <div className="poll-question">
          {poll.question}
        </div>

        <input
          className="poll-input"
          type="text"
          placeholder="Your Name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="options-container">

          {poll.options.map((option, index) => (

            <label
              key={index}
              className={`option-card ${
                selectedAnswer === option ? "selected" : ""
              }`}
            >

              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) =>
                  setSelectedAnswer(e.target.value)
                }
              />

              <span>{option}</span>

            </label>

          ))}

        </div>

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Vote
        </button>

      </div>

    </div>
  );
}

export default PollPage;