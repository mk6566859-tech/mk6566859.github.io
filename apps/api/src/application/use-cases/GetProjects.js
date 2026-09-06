export function makeGetProjects(projectRepository) {
  return async function getProjects() {
    return projectRepository.getProjects();
  };
}
