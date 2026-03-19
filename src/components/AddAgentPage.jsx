import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function AddAgentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      await API.post("/agents", {
        name: formData.name.trim(),
        email: formData.email.trim(),
      });

      setMessage("Sales agent created successfully.");
      setFormData({ name: "", email: "" });

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="brand">Anvaya CRM</h2>
        <nav className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/leads">Leads</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>

      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Sales Team</p>
            <h1>Add New Agent</h1>
          </div>
        </div>

        <section className="panel form-panel">
          {message && <div className="alert success">{message}</div>}
          {error && <div className="alert error">{error}</div>}

          <form className="single-form" onSubmit={handleSubmit}>
            <label>
              Agent Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </label>

            <button className="primary-button form-action" type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create Agent"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddAgentPage;
