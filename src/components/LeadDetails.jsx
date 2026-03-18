import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";

function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [comments, setComments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editForm, setEditForm] = useState({
    status: "",
    salesAgent: "",
    priority: "",
    timeToClose: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const [leadRes, commentsRes, agentsRes] = await Promise.all([
          API.get(`/leads/${id}`),
          API.get(`/leads/${id}/comments`),
          API.get("/agents"),
        ]);

        const leadData = leadRes.data;
        setLead(leadData);
        setComments(commentsRes.data || []);
        setAgents(agentsRes.data || []);
        setEditForm({
          status: leadData.status || "New",
          salesAgent: leadData.salesAgent?._id || "",
          priority: leadData.priority || "Medium",
          timeToClose: leadData.timeToClose || 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  async function handleCommentSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await API.post(`/leads/${id}/comments`, { commentText });
      setComments((prev) => [response.data, ...prev]);
      setCommentText("");
      setMessage("Comment added.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateLead(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await API.patch(`/leads/${id}`, {
        status: editForm.status,
        salesAgent: editForm.salesAgent,
        priority: editForm.priority,
        timeToClose: Number(editForm.timeToClose),
      });

      setLead(response.data);
      setMessage("Lead updated successfully.");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <div className="page-shell"><p className="status-text">Loading lead details...</p></div>;
  }

  if (error && !lead) {
    return <div className="page-shell"><div className="alert error">{error}</div></div>;
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="brand">Anvaya CRM</h2>
        <nav className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/leads">Back to Leads</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </aside>

      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Lead Profile</p>
            <h1>{lead?.name}</h1>
          </div>
        </div>

        {error && <div className="alert error">{error}</div>}
        {message && <div className="alert success">{message}</div>}

        <div className="two-column">
          <section className="panel">
            <div className="section-head">
              <h2>Lead Details</h2>
            </div>

            <div className="details-grid">
              <p><strong>Name:</strong> {lead?.name}</p>
              <p><strong>Source:</strong> {lead?.source}</p>
              <p><strong>Status:</strong> {lead?.status}</p>
              <p><strong>Priority:</strong> {lead?.priority}</p>
              <p><strong>Sales Agent:</strong> {lead?.salesAgent?.name || "Unassigned"}</p>
              <p><strong>Time to Close:</strong> {lead?.timeToClose} days</p>
              <p><strong>Tags:</strong> {lead?.tags?.join(", ") || "None"}</p>
            </div>
          </section>

          <section className="panel">
            <div className="section-head">
              <h2>Edit Lead</h2>
            </div>

            <form className="form-grid" onSubmit={handleUpdateLead}>
              <label>
                Status
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </label>

              <label>
                Sales Agent
                <select
                  value={editForm.salesAgent}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, salesAgent: e.target.value }))}
                >
                  <option value="">Select Sales Agent</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Priority
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>

              <label>
                Time to Close
                <input
                  type="number"
                  min="0"
                  value={editForm.timeToClose}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, timeToClose: e.target.value }))}
                />
              </label>

              <div className="full-width">
                <button className="primary-button" type="submit">Update Lead</button>
              </div>
            </form>
          </section>
        </div>

        <section className="panel">
          <div className="section-head">
            <h2>Comments</h2>
          </div>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              rows="4"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a progress update..."
              required
            />
            <button className="primary-button" type="submit">Submit Comment</button>
          </form>

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="muted-text">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <article key={comment._id} className="comment-card">
                  <div className="list-row">
                    <strong>{comment.author?.name || "Unknown Author"}</strong>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                  <p>{comment.commentText}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default LeadDetails;
