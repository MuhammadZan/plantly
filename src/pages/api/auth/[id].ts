import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/utils/db";
import { User, IUser } from "@/model/User";
import { authenticateUser, response } from "@/utils/helper";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method?.toLocaleLowerCase() === "delete") {
      await connectToDb();
      const user = await authenticateUser(req);
      const { id } = req.query;
      if (!user) {
        return response(res, 400, { message: "User not found" });
      }
      await User.findByIdAndDelete(id);
      return response(res, 200, { message: "customer deleted successfully" });
    } else {
      return response(res, 405, { message: "Method not Allowed" });
    }
  } catch (error) {
    return response(res, 500, { message: "Internal server error", error });
  }
}
