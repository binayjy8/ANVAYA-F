import { Link } from "react-router-dom";
import API from "../services/api";

function LeadList({ leads, onLeadDeleted }) {
  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this lead?");
    if (!confirmed) return;

    try {
      await API.delete(`/leads/${id}`);
      onLeadDeleted?.();
    } catch (error) {
      window.alert(error.message);
    }
  }

  if (!leads.length) {
    return (
      <section className="panel">
        <p className="muted-text">No leads found for the selected filters.</p>
      </section>
    );
  }

  return (
    <section className="cards-grid">
      {leads.map((lead) => (
        <article key={lead._id} className="lead-card">
          <div className="card-top">
            <div>
              <h3>{lead.name}</h3>
              <p className="mini-meta">{lead.source}</p>
            </div>
            <span className={`badge badge-${lead.priority?.toLowerCase()}`}>
              {lead.priority}
            </span>
          </div>

          <div className="details-grid">
            <p><strong>Status:</strong> {lead.status}</p>
            <p><strong>Agent:</strong> {lead.salesAgent?.name || "Unassigned"}</p>
            <p><strong>Time to Close:</strong> {lead.timeToClose} days</p>
            <p><strong>Tags:</strong> {lead.tags?.join(", ") || "None"}</p>
          </div>

          <div className="card-actions">
            <Link className="secondary-button" to={`/leads/${lead._id}`}>View Details</Link>
            <button className="danger-button" onClick={() => handleDelete(lead._id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default LeadList;
