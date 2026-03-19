import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SettingsPage() {
  const [settings, setSettings] = useState({
    appName: "Anvaya CRM",
    defaultSource: "Website",
    defaultStatus: "New",
    defaultPriority: "Medium",
    notifications: true,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("crm-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("crm-settings", JSON.stringify(settings));
    setMessage("Settings saved successfully.");
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="brand">Anvaya CRM</h2>
        <nav className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/leads">Leads</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/add-agent">Add Agent</Link>
        </nav>
      </aside>

      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Preferences</p>
            <h1>Settings</h1>
          </div>
        </div>

        <section className="panel form-panel">
          {message && <div className="alert success">{message}</div>}

          <form className="single-form" onSubmit={handleSubmit}>
            <label>
              App Name
              <input
                type="text"
                name="appName"
                value={settings.appName}
                onChange={handleChange}
              />
            </label>

            <label>
              Default Lead Source
              <select
                name="defaultSource"
                value={settings.defaultSource}
                onChange={handleChange}
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
              </select>
            </label>

            <label>
              Default Lead Status
              <select
                name="defaultStatus"
                value={settings.defaultStatus}
                onChange={handleChange}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </label>

            <label>
              Default Priority
              <select
                name="defaultPriority"
                value={settings.defaultPriority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              Enable notifications
            </label>

            <button className="primary-button form-action" type="submit">
              Save Settings
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default SettingsPage;
