export function makeDeleteProject(projectRepository) {
  return async function deleteProject(id) {
    return projectRepository.deleteProject(id);
  };
}
