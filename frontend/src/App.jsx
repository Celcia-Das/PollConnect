import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import CreatePoll from "./pages/CreatePoll";
import ManagePolls from "./pages/ManagePolls";
import PollPage from "./pages/PollPage";
import Results from "./pages/Results";
import ThankYou from "./pages/ThankYou";
import QRCodePage from "./pages/QRCodePage";
import EditPoll from "./pages/EditPoll";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-register" element={<AdminRegister />} />

      {/* Protected Admin Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-poll"
        element={
          <ProtectedRoute>
            <CreatePoll />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-polls"
        element={
          <ProtectedRoute>
            <ManagePolls />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-poll/:id"
        element={
          <ProtectedRoute>
            <EditPoll />
          </ProtectedRoute>
        }
      />

      {/* Public Poll Routes */}
      <Route path="/poll/:id" element={<PollPage />} />
      <Route path="/results/:id" element={<Results />} />
      <Route path="/qr/:id" element={<QRCodePage />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;