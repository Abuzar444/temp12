import { Router } from "express";
const router = Router();
import {
  validateIdParam,
  validateProjectInput,
} from "../middleware/validationMiddleware.js";

import {
  getAllProjects,
  getProject,
  getInfoProject,
  updateSingleProject,
  deleteProject,
  createProject,
  showStats,
} from "../controllers/projectController.js";

router.route("/").get(getAllProjects).post(validateProjectInput, createProject);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(getInfoProject)
  .get(validateIdParam, getProject)
  .patch(validateIdParam, updateSingleProject)
  .delete(validateIdParam, deleteProject);

export default router;
