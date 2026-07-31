import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LeadsPage from "./pages/LeadsPage";
import AddAgentPage from "./components/AddAgentPage";
import SettingsPage from "./components/SettingsPage";
import LeadDetails from "./components/LeadDetails";
import Reports from "./components/Reports";
import LeadStatusView from "./components/LeadStatusView";
import SalesAgentView from "./components/SalesAgentView";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <LoginForm />}
        />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/leads" element={<ProtectedRoute><LeadsPage /></ProtectedRoute>} />
        <Route path="/leads/:id" element={<ProtectedRoute><LeadDetails /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/status-view" element={<ProtectedRoute><LeadStatusView /></ProtectedRoute>} />
        <Route path="/agent-view" element={<ProtectedRoute><SalesAgentView /></ProtectedRoute>} />
        <Route path="/add-agent" element={<ProtectedRoute><AddAgentPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
