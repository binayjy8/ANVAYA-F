import { Link } from "react-router-dom";

function LeadList({ leads }) {
  if (!leads.length) {
    return <p>No leads found.</p>;
  }

  return (
    <div>
      {leads.map((lead) => (
        <div key={lead._id} style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "12px" }}>
          <h3>{lead.name}</h3>
          <p>Status: {lead.status}</p>
          <p>Priority: {lead.priority}</p>
          <p>Source: {lead.source}</p>
          <p>Sales Agent: {lead.salesAgent?.name || "Unassigned"}</p>
          <p>Time to Close: {lead.timeToClose} days</p>
          <p>Tags: {lead.tags?.join(", ") || "None"}</p>
          <Link to={`/leads/${lead._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default LeadList;
