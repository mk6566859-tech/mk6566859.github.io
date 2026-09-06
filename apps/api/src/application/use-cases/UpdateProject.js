export function makeUpdateProject(projectRepository) {
  return async function updateProject(id, projectData) {
    if (!projectData.title || !projectData.description) {
      throw new Error("Title and description are required");
    }

    return projectRepository.updateProject(id, projectData);
  };
}
