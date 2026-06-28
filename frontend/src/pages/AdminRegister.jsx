import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./AdminRegister.css";

function AdminRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="register-page">

        <div className="register-card">

          <span className="register-badge">
            Admin Registration
          </span>

          <h1>Create Admin Account</h1>

          <input
            className="register-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className="register-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="register-btn"
            onClick={handleRegister}
          >
            Create Account
          </button>

        </div>

      </div>
    </>
  );
}

export default AdminRegister;