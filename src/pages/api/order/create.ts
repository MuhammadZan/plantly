import { Order } from "@/model/Order";
import { IUser } from "@/model/User";
import { sendEmail } from "@/services/email-services";
import { ORDER_CONFIRMATION, ORDER_CREATE } from "@/utils/constant";
import { authenticateUser, response } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  if (req.method?.toLocaleLowerCase() === "post") {
    try {
      const user: IUser | null = await authenticateUser(req);
      const { products, medium } = req.body;
      if (!user) {
        return response(res, 400, { message: "User not found" });
      }
      let totalBill: number = 0;
      console.log(products);
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
      const html = ORDER_CREATE.message
        .replace("{{orderId}}", `${newOrder._id}`)
        .replace("{{customerName}}", `${user.fullName}`)
        .replace("{{customerEmail}}", `${user.email}`)
        .replace("{{customerPhone}}", `${user.contact}`)
        .replace("{{ totalAmount }}", `${totalBill}`)
        .replace("{{deliveryAddress}}", `${user.address}`);
      const confirmationTemplate = ORDER_CONFIRMATION.message
        .replace("{{orderId}}", `${newOrder._id}`)
        .replace("{{ totalAmount }}", `${totalBill}`)
        .replace("{{deliveryTime}}", `30 min`);
      await sendEmail(html, ORDER_CREATE.subject);
      await sendEmail(
        confirmationTemplate,
        ORDER_CONFIRMATION.subject,
        user.email
      );
      return response(res, 200, { newOrder });
    } catch (error) {
      console.log(error);
      return response(res, 500, { message: "Internal Server error", error });
    }
  } else {
    return response(res, 405, { message: "Method not allowed" });
  }
}
