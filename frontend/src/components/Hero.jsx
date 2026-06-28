import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">
          🚀 Modern Polling Platform
        </span>

        <h1>
          Create beautiful polls.
          <br />
          Share instantly.
          <br />
          Analyze effortlessly.
        </h1>

        <p>
          PollConnect helps you create interactive polls,
          share them using QR codes, collect responses in real
          time, and visualize analytics—all from one clean dashboard.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/admin")}
          >
            Get Started
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-card">
          <div className="poll-status">
            🟢 Live Poll
          </div>

          <h3>Favourite Programming Language?</h3>

          <div className="poll-option">
            <span>Java</span>
            <span>42%</span>
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: "42%" }}
            ></div>
          </div>

          <div className="poll-option">
            <span>Python</span>
            <span>36%</span>
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: "36%" }}
            ></div>
          </div>

          <div className="poll-option">
            <span>JavaScript</span>
            <span>22%</span>
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: "22%" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;