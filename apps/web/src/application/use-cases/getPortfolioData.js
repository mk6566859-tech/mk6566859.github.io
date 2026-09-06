export function makeGetPortfolioData(profileRepository, projectRepository) {
  return async function getPortfolioData() {
    const [profile, projects] = await Promise.all([
      profileRepository.getProfile(),
      projectRepository.getProjects()
    ]);

    return { profile, projects };
  };
}
