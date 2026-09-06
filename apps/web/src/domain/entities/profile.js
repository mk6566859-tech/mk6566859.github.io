export function createProfile(data) {
  return {
    name: data.name,
    headline: data.headline,
    summary: data.summary,
    location: data.location,
    linkedinUrl: data.linkedinUrl,
    githubUrl: data.githubUrl,
    email: data.email,
    phone: data.phone,
    resumeUrl: data.resumeUrl,
    imageUrl: data.imageUrl,
    skills: Array.isArray(data.skills) ? data.skills : []
  };
}
