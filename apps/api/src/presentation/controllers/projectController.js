import { makeGetProjects } from "../../application/use-cases/GetProjects.js";
import { makeCreateProject } from "../../application/use-cases/CreateProject.js";
import { makeUpdateProject } from "../../application/use-cases/UpdateProject.js";
import { makeDeleteProject } from "../../application/use-cases/DeleteProject.js";
import { inMemoryProjectRepository } from "../../infrastructure/repositories/inMemoryProjectRepository.js";

const getProjects = makeGetProjects(inMemoryProjectRepository);
const createProject = makeCreateProject(inMemoryProjectRepository);
const updateProject = makeUpdateProject(inMemoryProjectRepository);
const deleteProject = makeDeleteProject(inMemoryProjectRepository);

export async function getProjectsController(_req, res, next) {
  try {
    res.json(await getProjects());
  } catch (error) {
    next(error);
  }
}

export async function createProjectController(req, res, next) {
  try {
    const project = await createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
}

export async function updateProjectController(req, res, next) {
  try {
    const { id } = req.params;
    const project = await updateProject(id, req.body);
    res.json(project);
  } catch (error) {
    next(error);
  }
}

export async function deleteProjectController(req, res, next) {
  try {
    const { id } = req.params;
    await deleteProject(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

