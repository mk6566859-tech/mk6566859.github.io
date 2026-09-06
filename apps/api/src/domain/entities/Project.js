export class Project {
  constructor({ id, title, description, tags, featured, liveUrl, codeUrl, sourceUrl }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.featured = featured;
    this.liveUrl = liveUrl;
    this.codeUrl = codeUrl || sourceUrl; // Support both codeUrl and sourceUrl for backwards compatibility
  }
}

