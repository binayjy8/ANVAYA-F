import { useEffect, useState } from "react";
import API from "../services/api";

const defaultForm = {
  name: "",
  source: "Website",
  salesAgent: "",
  status: "New",
  tags: "",
  timeToClose: "",
  priority: "Medium",
};

function LeadForm({ onLeadCreated }) {
  const [form, setForm] = useState(defaultForm);
  const [agents, setAgents] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await API.get("/agents");
        setAgents(response.data || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchAgents();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...form,
        timeToClose: Number(form.timeToClose),
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const response = await API.post("/leads", payload);
      setForm(defaultForm);
      onLeadCreated?.(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Lead</h2>
      {error && <p>{error}</p>}

      <input name="name" placeholder="Lead Name" value={form.name} onChange={handleChange} required />

      <select name="source" value={form.source} onChange={handleChange}>
        <option>Website</option>
        <option>Referral</option>
        <option>Cold Call</option>
      </select>

      <select name="salesAgent" value={form.salesAgent} onChange={handleChange} required>
        <option value="">Select Sales Agent</option>
        {agents.map((agent) => (
          <option key={agent._id} value={agent._id}>
            {agent.name}
          </option>
        ))}
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Proposal Sent</option>
        <option>Closed</option>
      </select>

      <input name="tags" placeholder="High Value, Follow-up" value={form.tags} onChange={handleChange} />

      <input
        name="timeToClose"
        type="number"
        placeholder="Time to Close (days)"
        value={form.timeToClose}
        onChange={handleChange}
        min="1"
        required
      />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Add Lead"}
      </button>
    </form>
  );
}

export default LeadForm;
