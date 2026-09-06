export function makeGetProfile(profileRepository) {
  return async function getProfile() {
    return profileRepository.getProfile();
  };
}
