import mongoose from "mongoose";

let isConnected = false;

async function connectMongoDB(url) {
  if (isConnected) {
    mongoose
      .connect(url)
      .then(() => {
        console.log("MongoDb connected!");
      })
      .catch((err) => {
        console.log("MongoDB connection error: ", err);
      });
    return;
  }

  try {
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export { connectMongoDB };
