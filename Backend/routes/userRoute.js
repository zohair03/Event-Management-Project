import express from "express"
import { jwtAuthMiddleware } from "../middleware/auth.js"
import {handleGetAllUser, handleDeleteUser} from "../controllers/userController.js" 
import { authorizedRoles } from "../middleware/roles.js";

const router = express.Router()

// get all users
router.get("/allUsers", jwtAuthMiddleware, authorizedRoles("admin"), handleGetAllUser)

// delete a users
router.delete("/deleteUser", jwtAuthMiddleware, authorizedRoles("admin"), handleDeleteUser)

export default router