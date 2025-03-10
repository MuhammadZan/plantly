import { IProduct, Product } from "@/model/Product";
import { IUser } from "@/model/User";
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
    if (req.method?.toLowerCase() === "delete") {
      const { id }: Partial<IProduct> = req.query;
      await Product.findByIdAndDelete(id);
      return response(res, 200, { message: "Product deleted successfully" });
    } else {
      return response(res, 405, { message: "method not allowed" });
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error" });
  }
};
export default handler;
