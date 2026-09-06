import { httpRequest } from "../http/httpClient";

export const projectRepository = {
  async getProjects() {
    return httpRequest("/projects");
  }
};
