import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";
import { getAdminCredentials, saveAdminCredentials } from "../data/adminCredentials";
import "../styles/admin.css";

export function AdminDashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    liveUrl: "",
    codeUrl: ""
  });
  const [credentialForm, setCredentialForm] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const credentials = getAdminCredentials();
    setCredentialForm({
      username: credentials.username,
      password: "",
      confirmPassword: ""
    });
  }, []);

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      tags: "",
      liveUrl: "",
      codeUrl: ""
    });
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      liveUrl: project.liveUrl || "",
      codeUrl: project.codeUrl || ""
    });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    const projectData = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      liveUrl: formData.liveUrl || null,
      codeUrl: formData.codeUrl || null
    };

    try {
      let response;
      if (editingId) {
        // Update existing project
        response = await fetch(`http://localhost:4000/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData)
        });
      } else {
        // Create new project
        response = await fetch("http://localhost:4000/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData)
        });
      }

      if (!response.ok) throw new Error("Failed to save project");
      
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Failed to delete project");
      
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!credentialForm.username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    if (!credentialForm.password.trim()) {
      setError("Password cannot be empty.");
      return;
    }

    if (credentialForm.password !== credentialForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    saveAdminCredentials({
      username: credentialForm.username.trim(),
      password: credentialForm.password
    });

    setSuccessMessage("Admin credentials updated successfully.");
    setCredentialForm({
      username: credentialForm.username.trim(),
      password: "",
      confirmPassword: ""
    });
  };

  if (isLoading && projects.length === 0) {
    return <div className="admin-container"><p>Loading projects...</p></div>;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-title">
            <h1>Project Management</h1>
            <span>Admin Dashboard</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        {error && <div className="error-banner">{error}</div>}
        {successMessage && <div className="success-banner">{successMessage}</div>}

        <section className="security-card">
          <div className="section-title-row">
            <h2>Security</h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="security-form">
            <div className="form-group">
              <label htmlFor="adminUsername">Username</label>
              <input
                id="adminUsername"
                type="text"
                value={credentialForm.username}
                onChange={(event) => setCredentialForm({ ...credentialForm, username: event.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="adminPassword">New Password</label>
              <input
                id="adminPassword"
                type="password"
                value={credentialForm.password}
                onChange={(event) => setCredentialForm({ ...credentialForm, password: event.target.value })}
                placeholder="Enter a new password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="adminConfirmPassword">Confirm New Password</label>
              <input
                id="adminConfirmPassword"
                type="password"
                value={credentialForm.confirmPassword}
                onChange={(event) => setCredentialForm({ ...credentialForm, confirmPassword: event.target.value })}
                placeholder="Confirm new password"
              />
            </div>

            <button type="submit" className="btn-save security-button">
              Update Admin Credentials
            </button>
          </form>
        </section>

        <div className="dashboard-toolbar">
          <button
            onClick={handleAddNew}
            className="btn-add-project"
          >
            + Add New Project
          </button>
        </div>

        {showForm && (
          <div className="project-form-container">
            <form onSubmit={handleSave} className="project-form">
              <div className="form-header">
                <h2>{editingId ? "Edit Project" : "New Project"}</h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-close"
                >
                  ✕
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="title">Project Title *</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., My Awesome Project"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your project..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  id="tags"
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., React, JavaScript, Web"
                />
              </div>

              <div className="form-group">
                <label htmlFor="liveUrl">Live URL</label>
                <input
                  id="liveUrl"
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="codeUrl">Code URL</label>
                <input
                  id="codeUrl"
                  type="url"
                  value={formData.codeUrl}
                  onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">
                  {editingId ? "Update Project" : "Create Project"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="projects-section">
          <h2>Projects ({projects.length})</h2>
          
          {projects.length === 0 ? (
            <div className="empty-state">
              <p>No projects yet. Create your first project!</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card-admin">
                  <div className="project-card-header">
                    <h3>{project.title}</h3>
                    <div className="project-actions">
                      <button
                        onClick={() => handleEdit(project)}
                        className="btn-edit"
                        title="Edit project"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="btn-delete"
                        title="Delete project"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  <p className="project-description">{project.description}</p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        Code ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
