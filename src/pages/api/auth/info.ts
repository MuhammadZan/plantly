import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/utils/db";
import { authenticateUser, response } from "@/utils/helper";
import { IUser } from "@/model/User";
import { hash } from "bcryptjs";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDb();
    const user: IUser | null = await authenticateUser(req);
    if (!user) {
      return response(res, 400, { message: "user not found" });
    }
    if (req.method === "GET") {
      return response(res, 200, user);
    } else if (req.method === "PUT") {
      const { fullName, email, password }: Partial<IUser> = req.body;
      if (fullName) user.fullName = fullName;
      if (email) user.email = email;
      if (password) {
        const hashPassword = await hash(password, 10);
        user.password = hashPassword;
        await user.save();
      }
    } else {
      return response(res, 405, { message: "Method not Allowed" });
    }
  } catch (error) {
    return response(res, 500, { message: "Internal server error", error });
  }
}
