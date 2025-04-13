import { Event } from "../models/eventModel.js";

async function handleGetAllEvents(req, res) {
  try {
    const allEvents = await Event.find();
    res.status(201).json({allEvents});
  } catch (err) {
    console.log("error in allEvents api: ", err);
    res.status(500).send("failed to get all event: ", err);
  }
}

async function handleCreateEvent(req, res) {
  try {
    await Event.create(req.body);
    res.status(200).send(req.body);
  } catch (err) {
    res.send("failed to create event: ", err);
  }
}

async function handleUpdateEvent(req, res) {
  try {
  } catch (err) {}
}

async function handleGetEventbyFilter(req, res) {
  try {
  } catch (err) {}
}

async function handleDeleteEvent(req, res) {
  try {
  } catch (error) {}
}

export {
  handleGetAllEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleGetEventbyFilter,
  handleDeleteEvent,
};
