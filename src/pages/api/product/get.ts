import { Product } from "@/model/Product";
import { connectToDb } from "@/utils/db";
import { response } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    const products = await Product.find();
    return response(res, 200, products);
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error" });
  }
};
export default handler;
