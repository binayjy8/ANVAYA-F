import { useEffect, useState } from "react";
import API from "../services/api";

function Reports() {
  const [pipeline, setPipeline] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const [closedByAgent, setClosedByAgent] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        const [pipelineResponse, lastWeekResponse, closedByAgentResponse] =
          await Promise.all([
            API.get("/report/pipeline"),
            API.get("/report/last-week"),
            API.get("/report/closed-by-agent"),
          ]);

        setPipeline(pipelineResponse.data || []);
        setLastWeek(lastWeekResponse.data || []);
        setClosedByAgent(closedByAgentResponse.data || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchReports();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Reports</h2>

      <section>
        <h3>Pipeline</h3>
        {pipeline.map((item) => (
          <p key={item._id}>
            {item._id}: {item.totalLeads}
          </p>
        ))}
      </section>

      <section>
        <h3>Closed Last Week</h3>
        <p>{lastWeek.length} leads closed</p>
      </section>

      <section>
        <h3>Closed by Agent</h3>
        {closedByAgent.map((item, index) => (
          <p key={index}>
            {item.agentName}: {item.totalClosed}
          </p>
        ))}
      </section>
    </div>
  );
}

export default Reports;
