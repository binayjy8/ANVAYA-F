import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await API.get("/agents");
        setAgents(response.data || []);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    }

    fetchAgents();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        agents.map((agent) => (
          <div key={agent._id}>
            <p>Name: {agent.name}</p>
            <p>Email: {agent.email}</p>
            <p>CreatedAt: {agent.createdAt}</p>
            <p>UpdatedAt: {agent.updatedAt}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;