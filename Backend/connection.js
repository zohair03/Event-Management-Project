import mongoose from "mongoose";

function connectMongoDB(url) {
  mongoose
    .connect(url)
    .then(() => {console.log("MongoDb connected !!")})
    .catch((err) => {
      console.log("MongoDB connection error: ", err);
    });
}

export {connectMongoDB}