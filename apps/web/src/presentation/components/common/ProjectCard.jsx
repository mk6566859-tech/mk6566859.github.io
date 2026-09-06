import React from "react";

export function ProjectCard({ project }) {
  return (
    <article className="card project-card">
      <div className="project-card-top">
        <span className="project-number">{project.id}</span>
        {project.featured && <span className="badge">Featured</span>}
      </div>

      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <div className="tag-row">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-links">
        <a href={project.liveUrl} target="_blank" rel="noreferrer">Live ↗</a>
        <a href={project.sourceUrl} target="_blank" rel="noreferrer">Code ↗</a>
      </div>
    </article>
  );
}
