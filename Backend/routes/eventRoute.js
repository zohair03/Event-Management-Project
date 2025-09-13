import express from "express";
import {
  handleGetAllEvents,
  handleGetEventbyId,
  handleGetMyEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleGetEventbyFilter,
  handleDeleteEvent,
  handleGetRelatedEvent,
  handleSearchEvent,
  handlePurchasedEvents,
} from "../controllers/eventController.js";
import { jwtAuthMiddleware } from "../middleware/auth.js";
import { authorizedRoles } from "../middleware/roles.js";

const router = express.Router();

// get all events
router.get("/allEvents", handleGetAllEvents);

// get event by id
router.post("/eventById/:id", handleGetEventbyId);

// events purchased by user
router.post("/purchasedEvents", jwtAuthMiddleware, authorizedRoles("admin","user"), handlePurchasedEvents);

// get searched event
router.post("/search",handleSearchEvent);

// get events by category
router.get("/relatedEvent/:category", handleGetRelatedEvent);

// users own events
router.get("/myEvents", jwtAuthMiddleware, authorizedRoles("admin","user"), handleGetMyEvents);

// Search event by filter
router.post("/category", handleGetEventbyFilter);

// Create new event
router.post("/createEvent", jwtAuthMiddleware, authorizedRoles("admin","user"), handleCreateEvent);

// Update a event
router.patch("/updateEvent", jwtAuthMiddleware, authorizedRoles("admin","user"), handleUpdateEvent);

// Delete a event
router.post("/deleteEvent",jwtAuthMiddleware, authorizedRoles("admin","user"),  handleDeleteEvent);

export default router;