import "./EditPoll.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EditPoll() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchPoll();
  }, []);

  const fetchPoll = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/polls/${id}`
      );

      const data = await response.json();

      if (data.success) {
        setTitle(data.poll.title);
        setDescription(data.poll.description);
        setQuestion(data.poll.question);
        setOptions(data.poll.options);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePoll = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/polls/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            question,
            options,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("✅ Poll Updated Successfully!");
        navigate("/manage-polls");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update poll.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="editpoll-page">

        <div className="editpoll-card">

          <span className="editpoll-badge">
            Edit Poll
          </span>

          <h1>Update Poll</h1>

          <input
            className="editpoll-input"
            type="text"
            placeholder="Poll Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="editpoll-input"
            rows="4"
            placeholder="Poll Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="editpoll-input"
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {options.map((option, index) => (
            <div
              key={index}
              className="option-row"
            >
              <input
                className="editpoll-input"
                value={option}
                placeholder={`Option ${index + 1}`}
                onChange={(e) => {
                  const updated = [...options];
                  updated[index] = e.target.value;
                  setOptions(updated);
                }}
              />

              <button
                className="delete-option"
                onClick={() => {
                  if (options.length <= 2) return;

                  setOptions(
                    options.filter((_, i) => i !== index)
                  );
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="button-group">

            <button
              className="secondary-btn"
              onClick={() =>
                setOptions([...options, ""])
              }
            >
              ➕ Add Option
            </button>

            <button
              className="primary-btn"
              onClick={handleUpdatePoll}
            >
              💾 Update Poll
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default EditPoll;