import { Event } from "../models/eventModel.js";

async function handleGetAllEvents(req, res) {
  try {
    const allEvents = await Event.find();
    res.status(201).json({ allEvents });
  } catch (err) {
    console.log("error in allEvents api: ", err);
    res.status(500).send("failed to get all event: ", err);
  }
}

async function handleGetMyEvents(req, res) {
  try {
    const email = req.user.email;
    if (!email) {
      res.status(404).json({ massage: "Email not provided" });
    }

    const usersOwnEvents = await Event.find({ email: email });
    if (!usersOwnEvents) {
      res.status(400).json({ massage: "Error in finding users events" });
    }

    res.status(200).json({ usersEvents: usersOwnEvents });
  } catch (err) {
    console.log("error in allEvents api: ", err);
    res.status(500).send("failed to get all event: ", err);
  }
}

async function handleCreateEvent(req, res) {
  try {
    const event = req.body;
    if (!event) {
      res.status(401).json({ massage: "Provide event details" });
    }

    const isCreated = await Event.create(event);
    if (!isCreated) {
      res.status(403).json({ massage: "Failed to create new event" });
    }

    res.status(200).json({ massage: "Event created successfully !!" });
  } catch (err) {
    console.log("Error in create event api: ", err);
    res.status(500).json({ massage: "Internal sever error" });
  }
}

async function handleUpdateEvent(req, res) {
  try {
    const event = req.body;
    if (!event) {
      res.status(401).json({ massage: "Provide event details" });
    }

    const isUpdated = await Event.updateOne({ _id: event._id }, { $set: event });
    if (!isUpdated) {
      res.status(400).json({ massage: "Error in updating event" });
    }

    res.status(200).json({ massage: `Updated event ${event.name}` });
  } catch (err) {
    cosole.log("error in update api: ", err);
    res.status(500).json({ massage: "Server site error" });
  }
}

async function handleGetEventbyFilter(req, res) {
  try {
  } catch (err) {}
}

async function handleDeleteEvent(req, res) {
  try {
    const event = req.body;
    if(!event){
      res.status(400).json({ massage: "Provide event name" });
    }

    const isDeleted = await Event.deleteOne({ _id: event._id});
    if (!isDeleted) {
      res.status(404).json({ massage: "error in deleting event" });
    }

    res.status(200).json({ massage: `deleted ${event.name}` });
  } catch (err) {
    console.log("error in delete event api: ", err);
    res.status(500).json({ massage: "server site error" });
  }
}

export {
  handleGetAllEvents,
  handleGetMyEvents,
  handleCreateEvent,
  handleUpdateEvent,
  handleGetEventbyFilter,
  handleDeleteEvent,
};
