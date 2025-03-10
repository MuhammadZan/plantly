import { Schema, model, models, Model, Document } from "mongoose";
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  contact: string;
  postalCode: string;
  address: string;
}

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
});

export const User: Model<IUser> =
  models.User || model("User", userSchema, "User");
