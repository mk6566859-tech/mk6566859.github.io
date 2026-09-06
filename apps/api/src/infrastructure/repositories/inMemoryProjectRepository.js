import { Project } from "../../domain/entities/Project.js";

const projects = [
  new Project({
    id: "project-01",
    title: "AI Content Assistant",
    description: "Designed and built an AI-powered content generation experience that helps users create structured, usable output faster through clean UI design and API-driven workflows.",
    tags: ["React", "AI", "API"],
    featured: true,
    liveUrl: "#",
    codeUrl: "https://github.com/mk6566859-tech"
  }),
  new Project({
    id: "project-02",
    title: "Learning Roadmap Generator",
    description: "Created a practical planning tool that transforms user goals into personalized learning roadmaps, balancing usability, logic, and clear decision-making flows.",
    tags: ["JavaScript", "UX", "Product Thinking"],
    featured: true,
    liveUrl: "#",
    codeUrl: "https://github.com/mk6566859-tech"
  }),
  new Project({
    id: "project-03",
    title: "MERN Practice Applications",
    description: "Built a set of full-stack web apps covering authentication, dashboards, CRUD workflows, API integration, state management, and MongoDB-backed application logic.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    featured: false,
    liveUrl: "#",
    codeUrl: "https://github.com/mk6566859-tech"
  })
];

export const inMemoryProjectRepository = {
  async getProjects() {
    return projects;
  },

  async getProjectById(id) {
    return projects.find(p => p.id === id);
  },

  async createProject(projectData) {
    const id = `project-${Date.now()}`;
    const newProject = new Project({
      id,
      ...projectData,
      featured: false
    });
    projects.push(newProject);
    return newProject;
  },

  async updateProject(id, projectData) {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    
    const updatedProject = new Project({
      id,
      ...projects[index],
      ...projectData
    });
    projects[index] = updatedProject;
    return updatedProject;
  },

  async deleteProject(id) {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    
    projects.splice(index, 1);
    return true;
  }
};

