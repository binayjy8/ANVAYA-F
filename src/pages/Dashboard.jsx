import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reports from "../components/Reports";
import API from "../services/api";

function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [leadCount, setLeadCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [agentsResponse, leadsResponse] = await Promise.all([
          API.get("/agents"),
          API.get("/leads"),
        ]);

        setAgents(agentsResponse.data || []);
        setLeadCount(leadsResponse.data.total || 0);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchDashboardData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <p>Total Sales Agents: {agents.length}</p>
        <p>Total Leads: {leadCount}</p>
        <Link to="/leads">Go to Leads</Link>
      </div>

      <h2>Agents</h2>
      {agents.map((agent) => (
        <div key={agent._id}>
          <p>{agent.name}</p>
          <p>{agent.email}</p>
        </div>
      ))}

      <Reports />
    </div>
  );
}

export default Dashboard;
