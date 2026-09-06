import express from "express";
import cors from "cors";
import helmet from "helmet";
import { healthRouter } from "./presentation/routes/healthRoutes.js";
import { profileRouter } from "./presentation/routes/profileRoutes.js";
import { projectRouter } from "./presentation/routes/projectRoutes.js";
import { contactRouter } from "./presentation/routes/contactRoutes.js";
import { errorHandler } from "./presentation/middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: (origin, callback) => {
      // Allow localhost on any port for development
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    }
  }));
  app.use(express.json({ limit: "100kb" }));

  app.use("/api/health", healthRouter);
  app.use("/api/profile", profileRouter);
  app.use("/api/projects", projectRouter);
  app.use("/api/contact", contactRouter);

  app.use(errorHandler);
  return app;
}
