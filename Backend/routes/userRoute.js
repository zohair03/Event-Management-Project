import express from "express";
import {
  handleLoginUsers,
  handleCreateUsers,
} from "../controllers/userController.js";
import { jwtAuthMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/signUp", handleCreateUsers);

router.post("/login", handleLoginUsers);

export default router;