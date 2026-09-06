import React, { useState } from "react";
import { Avatar } from "../components/common/Avatar";
import { ProjectCard } from "../components/common/ProjectCard";
import { SectionHeading } from "../components/common/SectionHeading";
import { usePortfolio } from "../hooks/usePortfolio";
import { useSnackbar } from "../providers/SnackbarProvider";
import { contactRepository } from "../../infrastructure/repositories/contactRepository";

export function HomePage() {
  const { profile: person, projects } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", subject: "Portfolio inquiry", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { showSnackbar } = useSnackbar();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await contactRepository.sendMessage(form);
      setForm({ name: "", email: "", subject: "Portfolio inquiry", message: "" });
      showSnackbar("Message sent successfully!", "success");
    } catch (error) {
      showSnackbar(error.message || "Failed to send message. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section" id="home">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">PORTFOLIO • FULL STACK DEVELOPMENT</p>
            <h1>{person.name}</h1>
            <p className="hero-title">{person.headline}</p>
            <p className="hero-copy">{person.summary}</p>

            <div className="button-row">
              <a href={person.resumeUrl} className="button primary" download>
                Download Resume
              </a>
              <a className="button secondary" href={person.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              {person.githubUrl && (
                <a className="button secondary" href={person.githubUrl} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              )}
            </div>

            <div className="hero-meta">
              <span>{person.location}</span>
              <span>Available for selected opportunities</span>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <Avatar src={person.imageUrl} alt={`${person.name} profile`} size="xl" />
            <div className="photo-note">
              <span>Portfolio snapshot</span>
              <small>Built for clarity, speed, and maintainability.</small>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="section" id="projects">
        <div className="container">
          <SectionHeading
            eyebrow="SELECTED WORK"
            title="Product-minded builds with practical engineering behind them."
            description="A selection of projects that reflect clean interfaces, thoughtful architecture, and full-stack thinking applied to real user needs."
          />
          <div className="projects-grid projects-grid-wide">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section" id="about">
        <div className="container">
          <SectionHeading
            eyebrow="ABOUT"
            title={`About ${person.name}`}
            description="I focus on building dependable digital products that feel polished, perform well, and remain easy to evolve as requirements change."
          />

          <div className="about-grid">
            <div className="card about-photo-card">
              <Avatar src={person.imageUrl} alt={`${person.name} profile`} size="lg" />
              <h3>{person.headline}</h3>
              <p>{person.location}</p>
            </div>

            <div className="about-copy">
              <p>{person.summary}</p>
              <h3>Core skills</h3>
              <div className="tag-row">
                {person.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}
              </div>
              <div className="rule" />
              <p>
                I build with a clear separation between product logic, infrastructure, and interface concerns so the work stays maintainable, scalable, and easier to improve over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section page-section" id="contact">
        <div className="container">
          <SectionHeading
            eyebrow="CONTACT"
            title="Let's connect."
            description="Open to project inquiries, collaboration, freelance work, and new opportunities."
          />

          <div className="contact-layout">
            <div className="contact-links">
              <a href={`mailto:${person.email}`}>{person.email}</a>
              {person.phone && <a href={`tel:${person.phone.replace(/\s+/g, "")}`}>{person.phone}</a>}
              <a href={person.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              {person.githubUrl && (
                <a href={person.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
              )}
              <span>{person.location}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
