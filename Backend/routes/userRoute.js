import express from "express"
import { jwtAuthMiddleware } from "../middleware/auth.js"
import {
  handleGetAllUser,
  handleDeleteUser,
  handleUpdateUser,
} from "../controllers/userController.js"; 
import { authorizedRoles } from "../middleware/roles.js";

const router = express.Router()

// get all users
router.get("/allUsers", jwtAuthMiddleware, authorizedRoles("admin"), handleGetAllUser)

// update user
router.patch("/updateUser", jwtAuthMiddleware, authorizedRoles("admin","user"), handleUpdateUser)

// delete a users
router.delete("/deleteUser", jwtAuthMiddleware, authorizedRoles("admin"), handleDeleteUser)

export default router