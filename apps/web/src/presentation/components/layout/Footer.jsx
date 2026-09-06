import React from "react";
import { profile } from "../../data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <strong>{profile.name}</strong>
          <p>{profile.location}</p>
        </div>

        <div className="footer-links">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="footer-link-item">
              <span className="footer-icon" aria-hidden="true">✉</span>
              <span>{profile.email}</span>
            </a>
          )}
          {profile.phone && (
            <a href={`https://wa.me/${profile.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="footer-link-item">
              <span className="footer-icon" aria-hidden="true">✆</span>
              <span>{profile.phone}</span>
            </a>
          )}
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="footer-link-item">
            <span className="footer-icon" aria-hidden="true">in</span>
            <span>LinkedIn ↗</span>
          </a>
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="footer-link-item">
              <span className="footer-icon" aria-hidden="true">⌘</span>
              <span>GitHub ↗</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
