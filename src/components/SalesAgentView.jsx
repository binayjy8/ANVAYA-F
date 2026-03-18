function SalesAgentView({ leads }) {
  const grouped = leads.reduce((acc, lead) => {
    const key = lead.salesAgent?.name || "Unassigned";
    acc[key] = acc[key] || [];
    acc[key].push(lead);
    return acc;
  }, {});

  return (
    <div>
      <h2>Leads by Sales Agent</h2>
      {Object.entries(grouped).map(([agent, items]) => (
        <div key={agent}>
          <h3>{agent}</h3>
          {items.map((lead) => (
            <div key={lead._id}>
              <p>{lead.name}</p>
              <p>{lead.status}</p>
              <p>{lead.priority}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SalesAgentView;
