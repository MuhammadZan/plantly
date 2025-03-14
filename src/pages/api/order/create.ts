import { Order } from "@/model/Order";
import { IUser } from "@/model/User";
import { authenticateUser, response } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method?.toLocaleLowerCase() === "post") {
    try {
      const user: IUser | null = await authenticateUser(req);
      const { products, medium } = req.body;
      if (!user) {
        return response(res, 400, { message: "User not found" });
      }
      let totalBill: number = 0;
      for (let product of products) {
        totalBill += product.quantity * product.unitCost;
      }

      const newOrder = new Order({
        userId: user._id,
        items: products,
        status: "pending",
        orderMedium: medium,
        totalBill,
      });
      await newOrder.save();
      return response(res, 200, { newOrder });
    } catch (error) {
      console.log(error);
      return response(res, 500, { message: "Internal Server error", error });
    }
  } else {
    return response(res, 405, { message: "Method not allowed" });
  }
}
