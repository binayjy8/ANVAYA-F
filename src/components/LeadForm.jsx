import { useState } from "react";
import API from "../services/api";

const initialForm = {
  name: "",
  source: "Website",
  salesAgent: "",
  status: "New",
  priority: "Medium",
  timeToClose: "",
  tags: "",
};

function LeadForm({ agents = [], onLeadCreated }) {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        ...formData,
        timeToClose: Number(formData.timeToClose),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await API.post("/leads", payload);
      setMessage("Lead created successfully.");
      setFormData(initialForm);
      onLeadCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="section-head">
        <h2>Add New Lead</h2>
      </div>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      <label>
        Lead Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Acme Corp"
          required
        />
      </label>

      <label>
        Lead Source
        <select name="source" value={formData.source} onChange={handleChange}>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
        </select>
      </label>

      <label>
        Sales Agent
        <select
          name="salesAgent"
          value={formData.salesAgent}
          onChange={handleChange}
          required
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
        Lead Status
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
        </select>
      </label>

      <label>
        Priority
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>

      <label>
        Time to Close
        <input
          type="number"
          name="timeToClose"
          value={formData.timeToClose}
          onChange={handleChange}
          placeholder="30"
          min="0"
          required
        />
      </label>

      <label className="full-width">
        Tags
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="High Value, Follow-up"
        />
      </label>

      <div className="full-width">
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Lead"}
        </button>
      </div>
    </form>
  );
}

export default LeadForm;
