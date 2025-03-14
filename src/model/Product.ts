import { Schema, Model, model, Document, models } from "mongoose";
export interface IProduct extends Document {
  name: string;
  image: string;
  description: string;
  price: number;
  type?: string;
}
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, default: "plant" },
});
export const Product: Model<IProduct> =
  models.Product || model<IProduct>("Product", productSchema, "Product");
