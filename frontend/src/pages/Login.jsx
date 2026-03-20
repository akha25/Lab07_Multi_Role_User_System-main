import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authAPI } from "../api/api";

const credentialPresets = [
  {
    label: "Super Admin",
    email: "coolboy@app.com",
    password: "coolboy123",
    accent: "super",
    note: "Full system access",
  },
  {
    label: "Admin",
    email: "user@app.com",
    password: "user123",
    accent: "admin",
    note: "Team and user management",
  },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const applyPreset = (email, password) => {
    setForm({ email, password });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authAPI.login(form);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-shell">
        <section className="auth-showcase">
          <div>
            <p className="auth-kicker">Multi-role access control</p>
            <h1>Simple login for admins and super admins.</h1>
            <p className="auth-subtitle auth-showcase-copy">
              Sign in with your assigned account and move straight to the
              dashboard.
            </p>
          </div>

          <div className="auth-checklist">
            <div className="auth-check-item">Role-based dashboard access</div>
            <div className="auth-check-item">Protected admin actions</div>
            <div className="auth-check-item">Quick test account autofill</div>
          </div>

          <div className="auth-credential-panel">
            <div className="auth-credential-header">
              <span className="auth-panel-title">Test credentials</span>
              <span className="auth-panel-caption">Click to autofill</span>
            </div>
            <div className="auth-credential-grid">
              {credentialPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className={`credential-chip credential-chip-${preset.accent}`}
                  onClick={() => applyPreset(preset.email, preset.password)}
                >
                  <span>{preset.label}</span>
                  <small>{preset.note}</small>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="auth-card auth-card-elevated">
          <div className="auth-header auth-header-left">
            <div className="auth-icon" aria-hidden="true">
              LOCK
            </div>
            <p className="auth-kicker">Welcome back</p>
            <h2>Sign in to continue</h2>
            <p className="auth-subtitle">
              Use your email and password to open the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="login-password">Password</label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <button
              id="login-submit"
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer auth-footer-left">
            <p>
              Don&apos;t have an account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
