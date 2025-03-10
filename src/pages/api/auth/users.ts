import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/utils/db";
import { User, IUser } from "@/model/User";
import { authenticateUser, response } from "@/utils/helper";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method?.toLocaleLowerCase() === "get") {
      await connectToDb();
      const user = await authenticateUser(req);
      if (!user) {
        return response(res, 400, { message: "User not found" });
      }
      const users: IUser[] | [] = await User.find();
      if (!users.length) {
        return response(res, 400, { message: "Users not found" });
      }
      return response(res, 200, users);
    } else {
      return response(res, 405, { message: "Method not Allowed" });
    }
  } catch (error) {
    return response(res, 500, { message: "Internal server error", error });
  }
}
