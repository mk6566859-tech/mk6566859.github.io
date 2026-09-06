import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { getAdminCredentials } from "../data/adminCredentials";
import "../styles/admin.css";

export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const credentials = getAdminCredentials();

    if (username === credentials.username && password === credentials.password) {
      login();
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials.");
    }

    setIsLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-topbar">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/")}
            aria-label="Back to portfolio"
            title="Back to portfolio"
          >
            ←
          </button>

          <div className="login-header">
            <h1>Admin Panel</h1>
            <p>Project Management</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
