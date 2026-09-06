export class Profile {
  constructor({ name, headline, summary, location, linkedinUrl, githubUrl, email, phone, resumeUrl, imageUrl, skills }) {
    this.name = name;
    this.headline = headline;
    this.summary = summary;
    this.location = location;
    this.linkedinUrl = linkedinUrl;
    this.githubUrl = githubUrl;
    this.email = email;
    this.phone = phone;
    this.resumeUrl = resumeUrl;
    this.imageUrl = imageUrl;
    this.skills = skills;
  }
}
