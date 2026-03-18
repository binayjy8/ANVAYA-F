import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Reports() {
  const [pipeline, setPipeline] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const [closedByAgent, setClosedByAgent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        const [pipelineRes, lastWeekRes, closedByAgentRes] = await Promise.all([
          API.get("/report/pipeline"),
          API.get("/report/last-week"),
          API.get("/report/closed-by-agent"),
        ]);

        setPipeline(pipelineRes.data || []);
        setLastWeek(lastWeekRes.data || []);
        setClosedByAgent(closedByAgentRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  const pipelineChartData = {
    labels: pipeline.map((item) => item._id),
    datasets: [
      {
        label: "Leads in Pipeline",
        data: pipeline.map((item) => item.totalLeads),
        backgroundColor: ["#b85c38", "#d88c5a", "#e7b27a", "#8fa67f", "#5c7a5c"],
        borderRadius: 8,
      },
    ],
  };

  const closedByAgentChartData = {
    labels: closedByAgent.map((item) => item.agentName),
    datasets: [
      {
        label: "Closed Leads",
        data: closedByAgent.map((item) => item.totalClosed),
        backgroundColor: "#b85c38",
        borderRadius: 8,
      },
    ],
  };

  const statusDistributionData = {
    labels: pipeline.map((item) => item._id),
    datasets: [
      {
        label: "Lead Status Distribution",
        data: pipeline.map((item) => item.totalLeads),
        backgroundColor: ["#b85c38", "#d88c5a", "#e7b27a", "#8fa67f", "#5c7a5c"],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="page-shell">
        <p className="status-text">Loading reports...</p>
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
        </nav>
      </aside>

      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Analytics</p>
            <h1>Reports</h1>
          </div>
        </div>

        {error && <div className="alert error">{error}</div>}

        <div className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">Closed Last Week</p>
            <h3>{lastWeek.length}</h3>
          </article>
          <article className="stat-card">
            <p className="stat-label">Pipeline Statuses</p>
            <h3>{pipeline.length}</h3>
          </article>
          <article className="stat-card">
            <p className="stat-label">Agents Closing Leads</p>
            <h3>{closedByAgent.length}</h3>
          </article>
        </div>

        <div className="dashboard-grid">
          <section className="panel">
            <div className="section-head">
              <h2>Total Leads in Pipeline</h2>
            </div>
            <Bar data={pipelineChartData} />
          </section>

          <section className="panel">
            <div className="section-head">
              <h2>Lead Status Distribution</h2>
            </div>
            <Doughnut data={statusDistributionData} />
          </section>
        </div>

        <section className="panel">
          <div className="section-head">
            <h2>Leads Closed by Sales Agent</h2>
          </div>
          <Bar data={closedByAgentChartData} />
        </section>

        <section className="panel">
          <div className="section-head">
            <h2>Closed Leads Last Week</h2>
          </div>
          <div className="stack-list">
            {lastWeek.length === 0 ? (
              <p className="muted-text">No leads closed in the last week.</p>
            ) : (
              lastWeek.map((lead) => (
                <div key={lead._id} className="list-row">
                  <div>
                    <strong>{lead.name}</strong>
                    <p className="mini-meta">{lead.salesAgent?.name || "Unassigned"}</p>
                  </div>
                  <span>{new Date(lead.updatedAt).toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Reports;
