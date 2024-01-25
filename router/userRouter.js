import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  getUser,
} from "../controllers/userController.js";

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authMiddleware.js";

router.post("/user", getUser);
router.get("/current-user", authenticateUser, getCurrentUser);
router.get("/admin/app-stats", authenticateUser, getApplicationStats);
router.patch("/update-user", authenticateUser, updateUser);
router.get("/admin/app-stats", [
  authenticateUser,
  authorizePermissions("admin"),
  getApplicationStats,
]);

export default router;
