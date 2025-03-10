import { Order } from "@/model/Order";
import { IUser } from "@/model/User";
import { connectToDb } from "@/utils/db";
import { authenticateUser, response } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    const user: IUser | null = await authenticateUser(req);
    if (!user) {
      return response(res, 401, { message: "Unauthenticated request" });
    }
    const order = await Order.findOne({ userId: user._id, status: "pending" });
    return response(res, 200, order);
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error" });
  }
};
