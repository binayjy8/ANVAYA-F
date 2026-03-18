import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../services/api";
import LeadForm from "../components/LeadForm";
import LeadList from "../components/LeadList";
import { getQueryValue, updateQueryParams } from "../utils/queryHelper";

function LeadsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");

  const status = getQueryValue(searchParams, "status");
  const salesAgent = getQueryValue(searchParams, "salesAgent");
  const source = getQueryValue(searchParams, "source");
  const sortBy = getQueryValue(searchParams, "sortBy");

  useEffect(() => {
    async function fetchPageData() {
      try {
        setLoading(true);
        setError("");

        const query = new URLSearchParams();
        if (status) query.set("status", status);
        if (salesAgent) query.set("salesAgent", salesAgent);
        if (source) query.set("source", source);

        const [leadsRes, agentsRes] = await Promise.all([
          API.get(`/leads?${query.toString()}`),
          API.get("/agents"),
        ]);

        let data = leadsRes.data.data || [];

        if (sortBy === "priority") {
          const order = { High: 1, Medium: 2, Low: 3 };
          data = [...data].sort((a, b) => order[a.priority] - order[b.priority]);
        }

        if (sortBy === "timeToClose") {
          data = [...data].sort((a, b) => a.timeToClose - b.timeToClose);
        }

        setLeads(data);
        setAgents(agentsRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPageData();
  }, [status, salesAgent, source, sortBy, refreshKey]);

  function handleFilterChange(event) {
    const next = updateQueryParams(searchParams, {
      [event.target.name]: event.target.value,
    });
    setSearchParams(next);
  }

  function handleLeadCreated() {
    setShowForm(false);
    setRefreshKey((value) => value + 1);
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="brand">Anvaya CRM</h2>
        <nav className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/leads">Leads</Link>
          <Link to="/status-view">Status View</Link>
          <Link to="/agent-view">Agent View</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </aside>

      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Pipeline</p>
            <h1>Lead Management</h1>
          </div>
          <button className="primary-button" onClick={() => setShowForm((value) => !value)}>
            {showForm ? "Close Form" : "Add New Lead"}
          </button>
        </div>

        {showForm && (
          <section className="panel">
            <LeadForm agents={agents} onLeadCreated={handleLeadCreated} />
          </section>
        )}

        <section className="panel">
          <div className="section-head">
            <h2>Filters</h2>
          </div>

          <div className="filters-grid">
            <select name="status" value={status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>

            <select name="salesAgent" value={salesAgent} onChange={handleFilterChange}>
              <option value="">All Agents</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>

            <select name="source" value={source} onChange={handleFilterChange}>
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
            </select>

            <select name="sortBy" value={sortBy} onChange={handleFilterChange}>
              <option value="">No Sorting</option>
              <option value="priority">Priority</option>
              <option value="timeToClose">Time to Close</option>
            </select>
          </div>
        </section>

        {error && <div className="alert error">{error}</div>}
        {loading ? (
          <p className="status-text">Loading leads...</p>
        ) : (
          <LeadList leads={leads} onLeadDeleted={() => setRefreshKey((value) => value + 1)} />
        )}
      </main>
    </div>
  );
}

export default LeadsPage;
