import { Router } from "express";
import { sendContactController } from "../controllers/contactController.js";

export const contactRouter = Router();

contactRouter.post("/", sendContactController);
