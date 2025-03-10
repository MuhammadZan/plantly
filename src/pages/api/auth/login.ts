import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/utils/db";
import { User, IUser } from "@/model/User";
import { checkPassword, getJWT, response } from "@/utils/helper";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { email, password }: Partial<IUser> = req.body;
      await connectToDb();
      const user: IUser | null = await User.findOne({
        $or: [{ email }, { contact: email }],
      });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (!checkPassword(password as string, user.password)) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = getJWT(user._id as string);
      return response(res, 200, { token, user });
    } else {
      return response(res, 405, { message: "Method not Allowed" });
    }
  } catch (error) {
    console.log(error);
    return response(res, 500, { message: "Internal server error", error });
  }
}
