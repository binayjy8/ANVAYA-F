import { useEffect, useState } from "react";
import API from "../services/api";

function LeadsPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await API.get("/leads");
        setLeads(response.data.data || []);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    }

    fetchLeads();
  }, []);

  return (
    <div>
      <h1>Leads</h1>

      {leads.length === 0 ? (
        <p>No leads found</p>
      ) : (
        leads.map((lead) => (
          <div key={lead._id}>
            <p>Name: {lead.name}</p>
            <p>Status: {lead.status}</p>
            <p>Priority: {lead.priority}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default LeadsPage;