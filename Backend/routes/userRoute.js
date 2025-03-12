import express from "express";
import {
  handleLoginUsers,
  handleCreateUsers,
} from "../controllers/userController.js";
import { jwtAuthMiddleware } from "../middleware/auth.js";

const router = express.Router();

// sign up user
router.post("/signUp", handleCreateUsers);

// login user
router.post("/login", handleLoginUsers);

export default router;