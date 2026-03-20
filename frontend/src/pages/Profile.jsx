import { useEffect, useState } from "react";
import { usersAPI } from "../api/api";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    usersAPI.me()
      .then((data) => setProfile(data.user))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const roleBadge = (role) => {
    if (role === "SUPER_ADMIN") return "badge badge-super";
    if (role === "ADMIN") return "badge badge-admin";
    return "badge badge-user";
  };

  const roleIcon = (role) => {
    if (role === "SUPER_ADMIN") return "⚡";
    if (role === "ADMIN") return "🔧";
    return "👤";
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="main-content">
        <div className="page-header">
          <h1>My Profile</h1>
          <p>Your account details and access information</p>
        </div>

        {loading && <div className="loading-screen">Loading profile...</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {profile && (
          <div className="profile-container">
            <div className="profile-card">
              <div className="profile-avatar">
                {roleIcon(profile.role)}
              </div>
              <h2 className="profile-name">{profile.name}</h2>
              <span className={roleBadge(profile.role)}>{profile.role}</span>
            </div>

            <div className="profile-details-card">
              <h3>Account Details</h3>
              <div className="detail-row">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{profile.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{profile.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Role</span>
                <span className="detail-value">
                  <span className={roleBadge(profile.role)}>{profile.role}</span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">User ID</span>
                <span className="detail-value detail-mono">{profile.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
