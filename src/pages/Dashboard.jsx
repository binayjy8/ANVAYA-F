import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [pipeline, setPipeline] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [pipelineRes, leadsRes, agentsRes] = await Promise.all([
          API.get("/report/pipeline"),
          API.get("/leads?limit=5"),
          API.get("/agents"),
        ]);

        setPipeline(pipelineRes.data || []);
        setRecentLeads(leadsRes.data.data || []);
        setAgents(agentsRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const totalLeads = pipeline.reduce((sum, item) => sum + item.totalLeads, 0);

  if (loading) {
    return (
      <div className="page-shell">
        <p className="status-text">Loading dashboard...</p>
      </div>
    );
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
          <Link to="/add-agent">Add Agent</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>

      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Overview</p>
            <h1>Dashboard</h1>
          </div>
          <div className="header-actions">
            <Link className="primary-button" to="/leads">
              Manage Leads
            </Link>
            <Link className="secondary-button" to="/add-agent">
              Add Agent
            </Link>
            <Link className="secondary-button" to="/settings">
              Settings
            </Link>
          </div>
        </div>

        {error && <div className="alert error">{error}</div>}

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">Total Leads</p>
            <h3>{totalLeads}</h3>
          </article>
          <article className="stat-card">
            <p className="stat-label">Sales Agents</p>
            <h3>{agents.length}</h3>
          </article>
          <article className="stat-card">
            <p className="stat-label">Statuses</p>
            <h3>{pipeline.length}</h3>
          </article>
        </section>

        <section className="panel">
          <div className="section-head">
            <h2>Quick Actions</h2>
          </div>
          <div className="chip-row">
            <Link className="chip" to="/leads?status=New">New Leads</Link>
            <Link className="chip" to="/leads?status=Contacted">Contacted</Link>
            <Link className="chip" to="/leads?status=Qualified">Qualified</Link>
            <Link className="chip" to="/reports">Open Reports</Link>
            <Link className="chip" to="/add-agent">Create Agent</Link>
            <Link className="chip" to="/settings">Settings</Link>
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="panel">
            <div className="section-head">
              <h2>Pipeline Summary</h2>
            </div>
            <div className="stack-list">
              {pipeline.length === 0 ? (
                <p className="muted-text">No pipeline data available.</p>
              ) : (
                pipeline.map((item) => (
                  <div key={item._id} className="list-row">
                    <span>{item._id}</span>
                    <strong>{item.totalLeads}</strong>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="panel">
            <div className="section-head">
              <h2>Recent Leads</h2>
            </div>
            <div className="stack-list">
              {recentLeads.length === 0 ? (
                <p className="muted-text">No recent leads found.</p>
              ) : (
                recentLeads.map((lead) => (
                  <Link key={lead._id} className="card-link" to={`/leads/${lead._id}`}>
                    <div className="list-row">
                      <div>
                        <strong>{lead.name}</strong>
                        <p className="mini-meta">
                          {lead.status} • {lead.priority}
                        </p>
                      </div>
                      <span>{lead.salesAgent?.name || "Unassigned"}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="panel">
          <div className="section-head">
            <h2>Sales Agents</h2>
          </div>
          <div className="stack-list">
            {agents.length === 0 ? (
              <p className="muted-text">No agents found.</p>
            ) : (
              agents.map((agent) => (
                <div key={agent._id} className="list-row">
                  <div>
                    <strong>{agent.name}</strong>
                    <p className="mini-meta">{agent.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
