import { Event } from "../models/eventModel.js";
import { Category } from "../models/categoryModel.js";
import { PurchasedEvents } from "../models/ticketModel.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

async function handleGetAllEvents(req, res) {
  try {
    const allEvents = await Event.find();
    if (!allEvents) {
      return res.status(400).json({ massege: "Error in finding all events" });
    }

    res.status(201).json({ allEvents });
  } catch (err) {
    console.log("error in allEvents api: ", err);
    res.status(500).send("failed to get all event: ", err);
  }
}

async function handleGetEventbyId(req, res) {
  try {
    const selectedEventId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(selectedEventId)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const selectedEvent = await Event.findOne({
      _id: new ObjectId(selectedEventId),
    });
    if (!selectedEvent) {
      return res
        .status(400)
        .json({ massege: `Error in finding event of id: ${selectedEventId}` });
    }
    res.status(201).json({ selectedEvent });
  } catch (err) {
    console.log("error in get event by id api: ", err);
    res.status(500).json({ massege: "error in getting event by id api" });
  }
}

async function handleGetRelatedEvent(req, res) {
  try {
    const category = req.params.category;
    if (!category) {
      return res.status(404).json({ massege: "Category is not provided" });
    }

    const relatedEvents = await Event.find({ category: category });
    if (!relatedEvents) {
      return res
        .status(400)
        .json({ massege: `Error in finding event of category: ${category}` });
    }
    res.status(201).json({ relatedEvents });
  } catch (err) {
    console.log("error in get related event api: ", err);
    res.status(500).send("server site error: ", err);
  }
}

async function handleGetMyEvents(req, res) {
  try {
    const email = req.user.email;
    if (!email) {
      return res.status(404).json({ massege: "Email not provided" });
    }

    const usersOwnEvents = await Event.find({ email: email });
    if (!usersOwnEvents) {
      return res.status(400).json({ massege: "Error in finding users events" });
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
      return res.status(401).json({ massege: "Provide event details" });
    }

    const isCreated = await Event.create(event);
    if (!isCreated) {
      return res.status(403).json({ massege: "Failed to create new event" });
    }

    res
      .status(200)
      .json({ massege: "Event created successfully !!", isCreated });
  } catch (err) {
    console.log("Error in create event api: ", err);
    res.status(500).json({ massege: "Internal sever error" });
  }
}

async function handlePurchasedEvents(req, res) {
  try{
    const userId = req.body.userId;
    if (!userId) {
      return res.status(401).json({ massege: "UserId is not valid" });
    }

    const purchasedEventIds = await PurchasedEvents.findOne({user_id: userId},{purchasedEvents_ids: 1, _id: 0})
    if(!purchasedEventIds){
      return res.status(200).json({ massege: "Not purchased any events" });
    }
    
    const purchasedEvents = await Event.find({_id: {$in: purchasedEventIds.purchasedEvents_ids}});
    if(!purchasedEvents){
      return res.status(401).json({ massege: "Error in finding purchased events" });
    }

    res.status(200).json({userPurchasedEvents: purchasedEvents});

  } catch (err) {
    console.log("Error in getting purchased Events: ", err);
    res.status(500).json({ massege: "Internal sever error" });
  }
}

async function handleSearchEvent(req, res) {
  try {
    const searchTerm = req.body;
    if (!searchTerm) {
      return res.status(401).json({ massege: "Provide event details" });
    }
    if (searchTerm.query === "") {
      return res.status(200).json({ massege: "Provide event details" });
    }

    const isSearchedEvent = await Event.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: searchTerm.query,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    if (!isSearchedEvent) {
      return res.status(400).json({ massege: "Error in updating event" });
    }

    res.status(200).json({ massege: "Event searched", isSearchedEvent });
  } catch (err) {
    console.log("error in update api: ", err);
    res.status(500).json({ massege: "Server site error" });
  }
}

async function handleUpdateEvent(req, res) {
  try {
    const event = req.body;
    if (!event) {
      return res.status(401).json({ massege: "Provide event details" });
    }

    const isUpdated = await Event.updateOne(
      { _id: event._id },
      { $set: event }
    );
    if (!isUpdated) {
      return res.status(400).json({ massege: "Error in updating event" });
    }

    const newEvent = await Event.findOne({ _id: event._id });
    if (!newEvent) {
      return res.status(400).json({ massege: "Error in updating event" });
    }

    res.status(200).json({ massege: `Updated event ${event.name}`, newEvent });
  } catch (err) {
    console.log("error in update api: ", err);
    res.status(500).json({ massege: "Server site error" });
  }
}

async function handleGetEventbyFilter(req, res) {
  try {
    const category = req.body;
    if (!category) {
      return res.status(401).json({ massege: "Invalid Category" });
    }

    const isFilteredCategory = await Event.find({
      category: category.category,
    });
    if (!isFilteredCategory) {
      return res
        .status(400)
        .json({ massege: "Error in finding category events" });
    }

    res.status(200).json({
      massege: `Filtered event on ${category.category}`,
      isFilteredCategory,
    });
  } catch (err) {
    console.log("error in filter api: ", err);
    res.status(500).json({ massege: "Server site error" });
  }
}

async function handleDeleteEvent(req, res) {
  try {
    const event = req.body;
    if (!event) {
      return res.status(400).json({ massege: "Provide event name" });
    }

    const isDeleted = await Event.deleteOne({ _id: event._id });
    if (!isDeleted) {
      return res.status(404).json({ massege: "error in deleting event" });
    }

    res.status(200).json({ massege: `deleted ${event.name}` });
  } catch (err) {
    console.log("error in delete event api: ", err);
    res.status(500).json({ massege: "server site error" });
  }
}

export {
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
};
