import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">🗳️</span>
        <span>PollConnect</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>

        <button
          className="primary-btn"
          onClick={() => navigate("/admin")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default Navbar;