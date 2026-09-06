import { Profile } from "../../domain/entities/Profile.js";

const profile = new Profile({
  name: "Malik Muhammad Kashan",
  headline: "Full Stack Developer | BS Information Technology Student",
  summary:
    "BS Information Technology student and aspiring Full Stack Developer focused on building responsive, product-ready web experiences with strong frontend craft, clean architecture, and practical backend integration. I enjoy turning ideas into polished interfaces and scalable digital solutions powered by modern web technologies.",
  location: "Hyderabad, Sindh, Pakistan",
  linkedinUrl: "https://www.linkedin.com/in/malik-kashan-b7714439b/",
  githubUrl: "https://github.com/mk6566859-tech",
  email: "mk6566859@gmail.com",
  phone: "0319-3304773",
  resumeUrl: "/resume/Malik_Muhammad_Kashan_Resume.docx",
  imageUrl: "/images/malik-muhammad-kashan.jpeg",
  skills: [
    "React",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
    "Tailwind CSS",
    "Redux Toolkit",
    "React Router",
    "Git/GitHub",
    "Flutter",
    "Dart",
    "Responsive Design",
    "API Integration",
    "AI-assisted Development"
  ]
});

export const inMemoryProfileRepository = {
  async getProfile() {
    return profile;
  }
};
