import express from "express";
import {
  handleGetAllEvents,
  handleGetMyEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleGetEventbyFilter,
  handleDeleteEvent,
} from "../controllers/eventController.js";
import { jwtAuthMiddleware } from "../middleware/auth.js";
import { authorizedRoles } from "../middleware/roles.js";

const router = express.Router();

// get all events
router.get("/allEvents", handleGetAllEvents);

// users own events
router.get("/myEvents",jwtAuthMiddleware, authorizedRoles("admin","user"), handleGetMyEvents);

// Search event by filter
router.get("/SearchEventByFilter", jwtAuthMiddleware, authorizedRoles("admin","user"), handleGetEventbyFilter);

// Create new event
router.post("/createEvent", jwtAuthMiddleware, authorizedRoles("admin","user"), handleCreateEvent);

// Update a event
router.patch("/updateEvent", jwtAuthMiddleware, authorizedRoles("admin","user"), handleUpdateEvent);

// Delete a event
router.post("/deleteEvent",jwtAuthMiddleware, authorizedRoles("admin","user"),  handleDeleteEvent);

export default router;