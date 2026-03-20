import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">🛡️ RoleSystem</div>
      <div className="navbar-links">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Dashboard</NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Profile</NavLink>
        {isAdmin && (
          <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Users</NavLink>
        )}
        <button type="button" onClick={toggle} className="btn btn-ghost" aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button id="logout-btn-shared" onClick={handleLogout} className="btn btn-ghost">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
