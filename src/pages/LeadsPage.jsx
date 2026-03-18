import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import LeadList from "../components/LeadList";
import LeadStatusView from "../components/LeadStatusView";
import SalesAgentView from "../components/SalesAgentView";
import API from "../services/api";
import { buildLeadQuery, getFilterValue } from "../utils/queryHelper";

function LeadsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const status = getFilterValue(searchParams, "status");
  const salesAgent = getFilterValue(searchParams, "salesAgent");
  const source = getFilterValue(searchParams, "source");
  const view = getFilterValue(searchParams, "view", "list");

  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);
        setError("");

        const query = buildLeadQuery({ status, salesAgent, source });
        const response = await API.get(`/leads?${query}`);
        setLeads(response.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, [status, salesAgent, source]);

  function handleFilterChange(event) {
    const { name, value } = event.target;
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    setSearchParams(next);
  }

  return (
    <div>
      <h1>Leads</h1>

      <LeadForm onLeadCreated={() => window.location.reload()} />

      <div>
        <select name="status" value={status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          name="salesAgent"
          placeholder="Sales Agent ID"
          value={salesAgent}
          onChange={handleFilterChange}
        />

        <select name="source" value={source} onChange={handleFilterChange}>
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
        </select>

        <select name="view" value={view} onChange={handleFilterChange}>
          <option value="list">List View</option>
          <option value="status">Status View</option>
          <option value="agent">Agent View</option>
        </select>
      </div>

      {loading && <p>Loading leads...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && view === "list" && <LeadList leads={leads} />}
      {!loading && !error && view === "status" && <LeadStatusView leads={leads} />}
      {!loading && !error && view === "agent" && <SalesAgentView leads={leads} />}
    </div>
  );
}

export default LeadsPage;
