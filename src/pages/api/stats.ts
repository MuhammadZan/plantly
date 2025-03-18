import { Order } from "@/model/Order";
import { IProduct, Product } from "@/model/Product";
import { IUser, User } from "@/model/User";
import { connectToDb } from "@/utils/db";
import { authenticateUser, response } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    const user: IUser | null = await authenticateUser(req);
    if (!user) {
      return response(res, 401, { message: "Authentication failed" });
    }
    if (req.method?.toLowerCase() === "get") {
      const quickOrders = await Order.find(
        { status: "pending" },
        "userId totalBill orderMedium"
      )
        .sort({
          createdAt: 1,
        })
        .limit(5)
        .populate({ path: "userId", select: ["fullName"] });
      const orderCount = await Order.countDocuments({ status: "pending" });
      const userCount = await User.countDocuments();
      const menuCount = await Product.countDocuments();
      const totalSales = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalBill" },
          },
        },
      ]);
      const monthlySales: any = await Order.aggregate([
        {
          $addFields: {
            createdDate: { $toDate: "$createdAt" },
          },
        },
        {
          $group: {
            _id: { $month: "$createdDate" },
            totalSales: { $sum: "$totalBill" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
      const sales = [];
      for (let i = 1; i <= 12; i++) {
        const sale = monthlySales.find((sale: any) => sale._id === i);
        if (sale) {
          sales.push(Number(sale.totalSales.toFixed(2)));
        } else {
          sales.push(0);
        }
      }
      const result = await Order.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.product",
            totalQuantitySold: { $sum: "$items.quantity" },
          },
        },
        { $sort: { totalQuantitySold: -1 } },
        { $limit: 9 },
        {
          $lookup: {
            from: "Product",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
        {
          $project: {
            _id: 0,
            productId: "$_id",
            totalQuantitySold: 1,
            productName: "$productDetails.name",
            productImage: "$productDetails.image",
          },
        },
      ]);

      return response(res, 200, {
        quickOrders,
        userCount,
        menuCount,
        totalSales: totalSales[0]?.totalSales || 0,
        orderCount,
        sales,
        topSales: result,
      });
    } else {
      return response(res, 405, { message: "method not allowed" });
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error" });
  }
};
export default handler;
