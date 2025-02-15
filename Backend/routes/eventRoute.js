import express from "express";
import { Event } from "../models/eventModel.js";

const router = express.Router();

// Find all events
router.get("/allEvents", async (req, res) => {
  try {
    const allEvents = await Event.find();
    res.status(201).send(allEvents);
  } catch (err) {
    console.log("error in allEvents api: ", err);
    res.status(500).send("failed to get all event: ", err);
  }
});

// Create new event
router.post("/createEvent", async (req, res) => {
  try {
    await Event.create(req.body);
    res.status(200).send(req.body);
  } catch (err) {
    res.send("failed to create event: ", err);
  }
});

// Update a event
router.patch("/updateEvent", async (req, res) => {
  try {
    
  } catch (err) {
    
  }
});

// Search event by filter
router.get("/SearchEventByFilter", async (req, res) => {
  try {
    
  } catch (err) {
    
  }
});

// Delete a event
router.delete("/deleteEvent",(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

export default router;