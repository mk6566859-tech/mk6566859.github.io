export function makeCreateProject(projectRepository) {
  return async function createProject(projectData) {
    if (!projectData.title || !projectData.description) {
      throw new Error("Title and description are required");
    }

    return projectRepository.createProject(projectData);
  };
}
