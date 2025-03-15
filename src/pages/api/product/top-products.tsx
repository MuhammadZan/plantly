import { connectToDb } from "@/utils/db";
import { response } from "@/utils/helper";
import { Order } from "@/model/Order";
import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/model/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
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
        },
      },
    ]);
    const ids = result.map((r) => r.productId);
    const products = await Product.find({ _id: { $in: ids } });
    return response(res, 200, products);
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error" });
  }
};
export default handler;
