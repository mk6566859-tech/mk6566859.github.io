import React from "react";
import { Avatar } from "../components/common/Avatar";
import { SectionHeading } from "../components/common/SectionHeading";
import { usePortfolio } from "../hooks/usePortfolio";

export function AboutPage() {
  const { profile: person } = usePortfolio();

  return (
    <section className="section page-section">
      <div className="container">
        <SectionHeading
          eyebrow="ABOUT"
          title={`About ${person.name}`}
          description="I build practical, user-focused products with attention to clarity, responsiveness, and maintainable engineering decisions."
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
              My approach blends practical product thinking with a clean separation between UI, application logic, and infrastructure so the work remains easy to maintain and scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
