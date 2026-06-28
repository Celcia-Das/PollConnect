import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutModal from "../UI/LogoutModal";

function Sidebar() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const avatarGradients = [
    "linear-gradient(135deg, #8B5CF6, #EC4899)",
    "linear-gradient(135deg, #3B82F6, #06B6D4)",
    "linear-gradient(135deg, #10B981, #22C55E)",
    "linear-gradient(135deg, #F97316, #FACC15)",
    "linear-gradient(135deg, #6366F1, #8B5CF6)",
    "linear-gradient(135deg, #14B8A6, #3B82F6)",
    "linear-gradient(135deg, #EF4444, #F97316)",
    "linear-gradient(135deg, #EC4899, #8B5CF6)",
  ];

  const avatarGradient =
    avatarGradients[
      (admin?.name?.charCodeAt(0) || 0) %
        avatarGradients.length
    ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <>
      <aside className="sidebar">
        <div>
          <div className="logo-section">
            <div className="logo-circle">🗳️</div>

            <div>
              <h2>PollConnect</h2>
              <p>Admin Panel</p>
            </div>
          </div>

          <nav className="sidebar-links">
            <NavLink to="/dashboard">
              <span>📊</span>
              Dashboard
            </NavLink>

            <NavLink to="/create-poll">
              <span>➕</span>
              Create Poll
            </NavLink>

            <NavLink to="/manage-polls">
              <span>📋</span>
              Manage Polls
            </NavLink>
          </nav>
        </div>

        <div>
          <div className="sidebar-footer">
            <div
              className="admin-avatar"
              style={{
                background: avatarGradient,
              }}
            >
              {admin?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div>
              <h4>{admin?.name || "Administrator"}</h4>
              <p>{admin?.email || ""}</p>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default Sidebar;