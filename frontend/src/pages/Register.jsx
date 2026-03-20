import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/api";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authAPI.register(form);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-shell auth-shell-register">
        <section className="auth-showcase">
          <div>
            <p className="auth-kicker">New account setup</p>
            <h1>Create your account clearly and quickly.</h1>
            <p className="auth-subtitle auth-showcase-copy">
              Fill in your details once and enter the system immediately after
              registration.
            </p>
          </div>

          <div className="auth-checklist">
            <div className="auth-check-item">Create a standard user account</div>
            <div className="auth-check-item">Login starts automatically</div>
            <div className="auth-check-item">Single clean registration form</div>
          </div>

          <div className="auth-feature-card auth-feature-card-wide">
            <span className="auth-feature-eyebrow">What happens next</span>
            <strong>You will be redirected to the dashboard</strong>
            <p>
              After registration, the app signs you in and takes you directly to
              the protected area.
            </p>
          </div>
        </section>

        <section className="auth-card auth-card-elevated">
          <div className="auth-header auth-header-left">
            <div className="auth-icon" aria-hidden="true">
              JOIN
            </div>
            <p className="auth-kicker">Create account</p>
            <h2>Register as a new user</h2>
            <p className="auth-subtitle">
              Enter your details to generate a standard user account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
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
                <label htmlFor="reg-password">Password</label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <button
              id="register-submit"
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer auth-footer-left">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
