import { Schema, model, models, Model, Document } from "mongoose";
export interface IItems {
  product: Schema.Types.ObjectId;
  quantity: number;
  unitCost: number;
}
export interface IOrder extends Document {
  items: IItems[];
  userId: Schema.Types.ObjectId;
  totalBill: number;
  status: string;
  createdAt: number;
  updatedAt: number;
  orderMedium?: string;
}

const orderSchema = new Schema<IOrder>({
  items: [
    {
      product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
      quantity: { type: Number, required: true },
      unitCost: { type: Number, required: true },
    },
  ],
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  totalBill: { type: Number, required: true },
  status: { type: String, required: true },
  orderMedium: { type: String, default: "delivery" },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
});

export const Order: Model<IOrder> =
  models.Order || model("Order", orderSchema, "Order");
