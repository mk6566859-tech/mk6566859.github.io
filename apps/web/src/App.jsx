import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./presentation/pages/HomePage";
import { ProjectsPage } from "./presentation/pages/ProjectsPage";
import { AboutPage } from "./presentation/pages/AboutPage";
import { ContactPage } from "./presentation/pages/ContactPage";
import { AdminLogin } from "./presentation/pages/AdminLogin";
import { AdminDashboard } from "./presentation/pages/AdminDashboard";
import { AppShell } from "./presentation/components/layout/AppShell";
import { NotFoundPage } from "./presentation/pages/NotFoundPage";
import { AdminProvider } from "./presentation/providers/AdminProvider";

export default function App() {
  return (
    <AdminProvider>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Public Routes */}
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          {/* Keep the previous #home URL working for existing visitors. */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AdminProvider>
  );
}
