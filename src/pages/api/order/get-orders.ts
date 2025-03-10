import { Order } from "@/model/Order";
import { IUser } from "@/model/User";
import { connectToDb } from "@/utils/db";
import { authenticateUser, response } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    const user: IUser | null = await authenticateUser(req);
    if (!user) {
      return response(res, 401, { message: "Unauthenticated request" });
    }
    const orders = await Order.find({
      userId: user._id,
      status: "completed",
    });
    return response(res, 200, orders);
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error" });
  }
};
export default handler;
