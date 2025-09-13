import express from 'express';
import {handleGetAllOrders} from "../controllers/orderController.js";
import { jwtAuthMiddleware } from "../middleware/auth.js";
import { authorizedRoles } from "../middleware/roles.js";

const router = express.Router();

router.post("/all",  handleGetAllOrders);


export default router;