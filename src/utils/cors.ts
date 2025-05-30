import { NextApiRequest, NextApiResponse } from "next";

const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>) => async (req: NextApiRequest, res: NextApiResponse) => {
//   res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("origin", "https://nextjs-graphql-server-client.vercel.app");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  // another common pattern
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  await fn(req, res);
};

export default allowCors;
