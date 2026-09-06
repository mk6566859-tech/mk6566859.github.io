import React from "react";
import { ProjectCard } from "../components/common/ProjectCard";
import { SectionHeading } from "../components/common/SectionHeading";
import { usePortfolio } from "../hooks/usePortfolio";

export function ProjectsPage() {
  const { projects } = usePortfolio();

  return (
    <section className="section page-section">
      <div className="container">
        <SectionHeading
          eyebrow="PROJECTS"
          title="Selected projects"
          description="Use the project model to keep cards consistent while the content stays data-driven."
        />
        <div className="projects-grid projects-grid-wide">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
