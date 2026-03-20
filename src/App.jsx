import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LeadsPage from "./pages/LeadsPage";
import AddAgentPage from "./components/AddAgentPage";
import SettingsPage from "./components/SettingsPage";
import LeadDetails from "./components/LeadDetails";
import Reports from "./components/Reports";
import LeadStatusView from "./components/LeadStatusView";
import SalesAgentView from "./components/SalesAgentView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/status-view" element={<LeadStatusView />} />
        <Route path="/agent-view" element={<SalesAgentView />} />
        <Route path="/add-agent" element={<AddAgentPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
