export function createProject(data) {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    tags: data.tags ?? [],
    featured: Boolean(data.featured),
    liveUrl: data.liveUrl ?? "#",
    sourceUrl: data.sourceUrl ?? "#"
  };
}
