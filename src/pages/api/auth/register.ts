import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/utils/db";
import { User, IUser } from "@/model/User";
import { getJWT, hashPassword, response } from "@/utils/helper";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const {
        email,
        password,
        fullName,
        address,
        contact,
        postalCode,
      }: Partial<IUser> = req.body;
      await connectToDb();
      const hashedPassword = await hashPassword(password as string);
      const user: IUser | null = new User({
        email,
        fullName,
        password: hashedPassword,
        address,
        contact,
        postalCode,
      });
      await user.save();
      const token = getJWT(user._id as string);
      return response(res, 200, { token, user });
    } else {
      return response(res, 405, { message: "Method not Allowed" });
    }
  } catch (error) {
    return response(res, 500, { message: "Internal server error", error });
  }
}

