import { Router } from "express";
import {
  getProjectsController,
  createProjectController,
  updateProjectController,
  deleteProjectController
} from "../controllers/projectController.js";

export const projectRouter = Router();

projectRouter.get("/", getProjectsController);
projectRouter.post("/", createProjectController);
projectRouter.put("/:id", updateProjectController);
projectRouter.delete("/:id", deleteProjectController);
