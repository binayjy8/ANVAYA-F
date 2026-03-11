import { useEffect, useState } from "react";

function LeadsPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch("https://anvaya-b.vercel.app/leads");
        const result = await response.json();

        console.log(result);

        setLeads(result.data); // IMPORTANT
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    }

    fetchLeads();
  }, []);

  return (
    <div>
      <h1>Leads</h1>

      {leads.map((lead) => (
        <div key={lead._id}>
          <p>Name: {lead.name}</p>
          <p>Status: {lead.status}</p>
          <p>Priority: {lead.priority}</p>
        </div>
      ))}
    </div>
  );
}

export default LeadsPage;