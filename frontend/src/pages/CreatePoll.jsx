import "./CreatePoll.css";
import { useState } from "react";
import Navbar from "../components/Navbar";

function CreatePoll() {
  const [options, setOptions] = useState(["", ""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");

  const handleSavePoll = async () => {
    const pollData = {
      title,
      description,
      question,
      options,
    };

    try {
      const response = await fetch("http://localhost:5000/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pollData),
      });

      const data = await response.json();

      console.log(data);

      alert("✅ Poll created successfully!");
    } catch (error) {
      console.error(error);

      alert("❌ Failed to connect to backend.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-page">
        <div className="create-container">
          <h1 className="create-title">
            Create New Poll
          </h1>

          <p className="create-subtitle">
            Create interactive polls and share them instantly using QR codes.
          </p>

          <div className="create-card">
            <div className="form-group">
              <label className="form-label">
                Poll Title
              </label>

              <input
                type="text"
                placeholder="Enter poll title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Description
              </label>

              <textarea
                rows="4"
                placeholder="Enter poll description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Question
              </label>

              <input
                type="text"
                placeholder="Enter your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Poll Options
              </label>

              {options.map((option, index) => (
                <div key={index} className="option-row">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updated = [...options];
                      updated[index] = e.target.value;
                      setOptions(updated);
                    }}
                    className="form-input"
                  />

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      if (options.length <= 2) return;

                      const updated = options.filter(
                        (_, i) => i !== index
                      );

                      setOptions(updated);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="actions">
              <button
                className="secondary-btn"
                onClick={() => setOptions([...options, ""])}
              >
                ➕ Add Option
              </button>

              <button
                className="primary-btn"
                onClick={handleSavePoll}
              >
                💾 Save Poll
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePoll;