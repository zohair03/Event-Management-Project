import express from "express";
import {
  handleGetAllEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleGetEventbyFilter,
  handleDeleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Find all events
router.get("/allEvents", handleGetAllEvents);

// Create new event
router.post("/createEvent",handleCreateEvent);

// Update a event
router.patch("/updateEvent", handleUpdateEvent);

// Search event by filter
router.get("/SearchEventByFilter", handleGetEventbyFilter);

// Delete a event
router.delete("/deleteEvent", handleDeleteEvent);

export default router;
