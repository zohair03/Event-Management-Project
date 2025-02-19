import express from "express";
import { handleGetAllUsers, handleCreateUsers } from "../controllers/userController.js";

const router = express.Router()


router.post("/signUp", handleCreateUsers);

router.get("/login",handleGetAllUsers)

export default router;