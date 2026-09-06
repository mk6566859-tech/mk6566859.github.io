import React from "react";
import { SectionHeading } from "../components/common/SectionHeading";
import { profile } from "../data/profile";

export function ContactPage() {
  return (
    <section className="section page-section">
      <div className="container contact-layout">
        <div>
          <SectionHeading
            eyebrow="CONTACT"
            title="Let's connect."
            description="Open to project inquiries, collaborations, freelance work, and new opportunities."
          />
          <div className="contact-links">
            {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
            {profile.phone && <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</a>}
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
            {profile.resumeUrl && <a href={profile.resumeUrl} download>Download Resume</a>}
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
