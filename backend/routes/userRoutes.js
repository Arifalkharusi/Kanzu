import express, { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

export default router;
