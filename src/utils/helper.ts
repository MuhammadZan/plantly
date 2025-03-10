import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "./constant";
import { NextApiRequest, NextApiResponse } from "next";
import { compare, hash } from "bcryptjs";
import { User } from "@/model/User";

export const getJWT = (id: string): string => {
  return sign({ id }, JWT_SECRET);
};
export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};
export const checkPassword = async (
  password: string,
  hashed: string
): Promise<boolean> => {
  return await compare(password, hashed);
};
export const response = (
  res: NextApiResponse,
  status: number,
  payload: any
): any => {
  return res.status(status).json(payload);
};
export const authenticateUser = async (req: NextApiRequest): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return null;
    }
    const { id } = verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
