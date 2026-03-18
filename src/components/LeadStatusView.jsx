import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function LeadStatusView() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filters, setFilters] = useState({
    salesAgent: "",
    priority: "",
    sortBy: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, agentsRes] = await Promise.all([
          API.get("/leads?limit=50"),
          API.get("/agents"),
        ]);
        setLeads(leadsRes.data.data || []);
        setAgents(agentsRes.data || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  const grouped = useMemo(() => {
    let filtered = [...leads];

    if (filters.salesAgent) {
      filtered = filtered.filter((lead) => lead.salesAgent?._id === filters.salesAgent);
    }

    if (filters.priority) {
      filtered = filtered.filter((lead) => lead.priority === filters.priority);
    }

    if (filters.sortBy === "timeToClose") {
      filtered.sort((a, b) => a.timeToClose - b.timeToClose);
    }

    return filtered.reduce((acc, lead) => {
      const key = lead.status || "Unknown";
      if (!acc[key]) acc[key] = [];
      acc[key].push(lead);
      return acc;
    }, {});
  }, [leads, filters]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="brand">Anvaya CRM</h2>
        <nav className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/leads">Leads</Link>
          <Link to="/agent-view">Agent View</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </aside>

      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Grouped View</p>
            <h1>Leads by Status</h1>
          </div>
        </div>

        {error && <div className="alert error">{error}</div>}

        <section className="panel">
          <div className="filters-grid">
            <select
              value={filters.salesAgent}
              onChange={(e) => setFilters((prev) => ({ ...prev, salesAgent: e.target.value }))}
            >
              <option value="">All Agents</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>

            <select
              value={filters.priority}
              onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="">No Sorting</option>
              <option value="timeToClose">Time to Close</option>
            </select>
          </div>
        </section>

        <div className="status-columns">
          {Object.keys(grouped).length === 0 ? (
            <section className="panel">
              <p className="muted-text">No leads found.</p>
            </section>
          ) : (
            Object.entries(grouped).map(([status, items]) => (
              <section key={status} className="panel status-panel">
                <div className="section-head">
                  <h2>{status}</h2>
                  <span className="chip">{items.length} Leads</span>
                </div>

                <div className="stack-list">
                  {items.map((lead) => (
                    <Link key={lead._id} className="card-link" to={`/leads/${lead._id}`}>
                      <div className="list-row">
                        <div>
                          <strong>{lead.name}</strong>
                          <p className="mini-meta">
                            {lead.salesAgent?.name || "Unassigned"} • {lead.priority}
                          </p>
                        </div>
                        <span>{lead.timeToClose}d</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default LeadStatusView;
