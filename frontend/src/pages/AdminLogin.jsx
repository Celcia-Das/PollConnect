import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [adminName, setAdminName] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Save JWT token
        localStorage.setItem("token", data.token);

        // Save admin info
        localStorage.setItem(
          "admin",
          JSON.stringify(data.admin)
        );

        setAdminName(data.admin.name);
        setShowSuccessModal(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">
          <div className="login-icon">
            🔐
          </div>

          <h1>Welcome Back</h1>

          <p>
            Sign in to access your PollConnect dashboard.
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>
            Login
          </button>

          <p className="register-link">
            Don't have an admin account?{" "}
            <span onClick={() => navigate("/admin-register")}>
              Create Admin Account
            </span>
          </p>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">
              ✓
            </div>

            <h2>Login Successful!</h2>

            <p>
              Welcome back, <strong>{adminName}</strong>!
            </p>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/dashboard");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminLogin;