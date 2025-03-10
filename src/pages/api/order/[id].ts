import { IOrder, Order } from "@/model/Order";
import { IUser, User } from "@/model/User";
import { sendEmail } from "@/services/email-services";
import { ORDER_STATUS } from "@/utils/constant";
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
    if (req.method?.toLocaleLowerCase() === "put") {
      const { _id, status }: Partial<IOrder> = req.body;
      const order = await Order.findByIdAndUpdate(_id, { status });
      const customer = await User.findById(order?.userId);
      const html = ORDER_STATUS.message
        .replace("{{orderId}}", `${_id}`)
        .replace("{{status}}", `${status}`);
      await sendEmail(html, ORDER_STATUS.subject, customer?.email);
      return response(res, 200, order);
    } else if (req.method?.toLocaleLowerCase() === "delete") {
      const { id } = req.query;
      const order = await Order.findByIdAndDelete(id);
      return response(res, 200, order);
    } else {
      return response(res, 405, { message: "method not allowed" });
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error" });
  }
};
export default handler;
