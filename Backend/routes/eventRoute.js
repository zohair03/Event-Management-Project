import express from "express";
import {
  handleGetAllEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleGetEventbyFilter,
  handleDeleteEvent,
} from "../controllers/eventController.js";
import { jwtAuthMiddleware } from "../middleware/auth.js";
import { authorizedRoles } from "../middleware/roles.js";

const router = express.Router();

// get all events
router.get("/allEvents",jwtAuthMiddleware, authorizedRoles("admin","user"), handleGetAllEvents);

// Create new event
router.post("/createEvent", jwtAuthMiddleware, authorizedRoles("admin","user"), handleCreateEvent);

// Update a event
router.patch("/updateEvent", jwtAuthMiddleware, authorizedRoles("admin","user"), handleUpdateEvent);

// Search event by filter
router.get("/SearchEventByFilter", jwtAuthMiddleware, authorizedRoles("admin","user"), handleGetEventbyFilter);

// Delete a event
router.delete("/deleteEvent", jwtAuthMiddleware, authorizedRoles("admin","user"), handleDeleteEvent);

// only admin
router.get("/adminEvent", jwtAuthMiddleware, authorizedRoles("admin"), (req,res)=>{
  res.status(200).json({massage: "welcome admin" })
})

export default router;