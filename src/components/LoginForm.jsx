import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./LoginForm.css";

const PIPELINE = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(username, password);

      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("username", res.username);

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <aside className="login-brand">
        <div className="login-brand__top">
          <svg
            className="login-mark"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <path
              d="M4 5 L30 5 L19 29 L15 29 Z"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="login-wordmark">Anvaya</span>
        </div>

        <div className="login-brand__mid">
          <h1>Every lead has a path.</h1>
          <p>Track it from first contact to close.</p>
        </div>

        <ol className="pipeline" aria-hidden="true">
          {PIPELINE.map((stage, i) => (
            <li
              key={stage}
              className={`pipeline__step${
                i === PIPELINE.length - 1 ? " pipeline__step--final" : ""
              }`}
              style={{ animationDelay: `${i * 110 + 200}ms` }}
            >
              <span className="pipeline__dot" />
              <span className="pipeline__label">{stage}</span>
            </li>
          ))}
        </ol>

        <span className="login-brand__foot">Anvaya CRM · Internal</span>
      </aside>

      <main className="login-panel">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form__head">
            <h2>Welcome back</h2>
            <p>Sign in to pick up where you left off.</p>
          </div>

          <label className="field">
            <span className="field__label">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : "Sign in"}
          </button>
        </form>
      </main>
    </div>
  );
}