import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LeadsPage from "./pages/LeadsPage";
import LeadDetails from "./components/LeadDetails";

function LeadDetailsPage() {
  const { id } = useParams();
  return <LeadDetails leadId={id} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/leads/:id" element={<LeadDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

