function LeadStatusView({ leads }) {
  const grouped = leads.reduce((acc, lead) => {
    const key = lead.status || "Unknown";
    acc[key] = acc[key] || [];
    acc[key].push(lead);
    return acc;
  }, {});

  return (
    <div>
      <h2>Leads by Status</h2>
      {Object.entries(grouped).map(([status, items]) => (
        <div key={status}>
          <h3>{status}</h3>
          {items.map((lead) => (
            <div key={lead._id}>
              <p>{lead.name}</p>
              <p>{lead.salesAgent?.name || "Unassigned"}</p>
              <p>{lead.priority}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LeadStatusView;
