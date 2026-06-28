import "./ManagePolls.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ManagePolls() {
  const navigate = useNavigate();

  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/polls");
      const data = await response.json();
      setPolls(data.polls);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this poll?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/polls/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchPolls();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="manage-page">

        <div className="manage-container">

          <h1 className="manage-title">
            Manage Polls
          </h1>

          <p className="manage-subtitle">
            View, edit and manage all your polls from one place.
          </p>

          {polls.length === 0 ? (

            <div className="empty-state">
              No polls available.
            </div>

          ) : (

            polls.map((poll) => (

              <div className="poll-card" key={poll._id}>

                <div className="poll-header">

                  <div>

                    <h2>{poll.title}</h2>

                    <p>{poll.description}</p>

                  </div>

                  <span className="status">
                    Active
                  </span>

                </div>

                <div className="question-box">

                  <strong>Question</strong>

                  <p>{poll.question}</p>

                </div>

                <div className="options">

                  {poll.options.map((option, index) => (

                    <span
                      className="option-chip"
                      key={index}
                    >
                      {option}
                    </span>

                  ))}

                </div>

                <div className="action-buttons">

                  <button
                    className="action-btn"
                    onClick={() => navigate(`/poll/${poll._id}`)}
                  >
                    🗳 Open
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => navigate(`/results/${poll._id}`)}
                  >
                    📊 Results
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => navigate(`/qr/${poll._id}`)}
                  >
                    📱 QR
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => navigate(`/edit-poll/${poll._id}`)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(poll._id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </>
  );
}

export default ManagePolls;