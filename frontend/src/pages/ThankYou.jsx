import "./ThankYou.css";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="thankyou-page">

      <div className="thankyou-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>Thank You!</h1>

        <p>
          Your vote has been submitted successfully.
          <br />
          We appreciate your participation.
        </p>

        <button
          className="thankyou-btn"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>

      </div>

    </div>
  );
}

export default ThankYou;