import { PurchasedEvents } from "../models/ticketModel.js";


async function updatePurchasedEventsDB(userID, purchasedEventsID) {
  const isPurchasedBefore = await PurchasedEvents.findOne({
    user_id: userID,
  });

  if (!isPurchasedBefore) {
    const tickets = {
      user_id: userID,
      purchasedEvents_ids: [purchasedEventsID],
    };
    await PurchasedEvents.create(tickets);
  }

  if (isPurchasedBefore) {
    await PurchasedEvents.updateOne(
      { user_id: userID },
      { $push: { purchasedEvents_ids: purchasedEventsID } }
    );
  }
}

export { updatePurchasedEventsDB };