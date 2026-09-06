import { Router } from "express";
import { getProfileController } from "../controllers/profileController.js";

export const profileRouter = Router();

profileRouter.get("/", getProfileController);
