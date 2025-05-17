import { IProduct, Product } from "@/model/Product";
import { IUser } from "@/model/User";
import { connectToDb } from "@/utils/db";
import { authenticateUser, response } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    if (req.method?.toLocaleLowerCase() === "post") {
      const { name, price, description, image, type }: Partial<IProduct> =
        req.body;
      const newProduct = new Product({ name, price, description, image, type });
      await newProduct.save();
      return response(res, 200, newProduct);
    } else if (req.method?.toLocaleLowerCase() === "put") {
      const { _id, name, price, description, image, type }: Partial<IProduct> =
        req.body;
      await Product.findByIdAndUpdate(_id, {
        name,
        price,
        description,
        image,
        type,
      });
      return response(res, 200, { message: "Product Updated Successfully" });
    } else {
      return response(res, 405, { message: "method not allowed" });
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error" });
  }
};
export default handler;
