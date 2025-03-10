import mongoose from "mongoose";
import { MONGO_URI, dbName } from "./constant";

export const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, { dbName });
  } catch (error) {
    console.log(error);
  }
};
