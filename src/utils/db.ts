import mongoose from "mongoose";
import { MONGO_URI, dbName } from "./constant";

let isConnected = false;

export const connectToDb = async (): Promise<void> => {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, { dbName });
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
