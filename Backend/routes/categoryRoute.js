import express from "express";
import { jwtAuthMiddleware } from "../middleware/auth.js";
import {
  handleGetAllCategory,
  handleCreateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// get all categories
router.get("/all", handleGetAllCategory);

// create category
router.post("/create", handleCreateCategory);



export default router;
