import React from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">M</span>
          <span>Malik Muhammad Kashan</span>
        </Link>

        <nav className="main-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-link admin-link" to="/admin">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
