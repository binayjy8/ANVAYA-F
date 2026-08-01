import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import "./LoginForm.css";

const PIPELINE = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

export default function LoginForm() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isRegister = mode === "register";

  const switchMode = () => {
    setMode(isRegister ? "login" : "register");
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const res = isRegister
        ? await registerUser(username, password)
        : await loginUser(username, password);

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
          <svg className="login-mark" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path d="M4 5 L30 5 L19 29 L15 29 Z" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" />
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
              className={`pipeline__step${i === PIPELINE.length - 1 ? " pipeline__step--final" : ""}`}
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
            <h2>{isRegister ? "Create an account" : "Welcome back"}</h2>
            <p>
              {isRegister
                ? "Set up access to your team's pipeline."
                : "Sign in to pick up where you left off."}
            </p>
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
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
            />
          </label>

          {isRegister && (
            <label className="field">
              <span className="field__label">Confirm password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </label>
          )}

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : isRegister ? "Create account" : "Sign in"}
          </button>

          <button type="button" className="login-switch" onClick={switchMode}>
            {isRegister ? "Already have an account? Sign in" : "Don't have an account? Register"}
          </button>
        </form>
      </main>
    </div>
  );
}