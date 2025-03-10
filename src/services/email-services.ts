// import { AUTH_EMAIL, AUTH_PASS } from "@/utils/constant";
import { createTransport } from "nodemailer";
const AUTH_EMAIL = "umairsattar1346@gmail.com";
const AUTH_PASS = "havn bbnu gqxr xiyf";

const transport = createTransport({
  service: "Gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

export const sendEmail = async (
  html: string,
  subject: string,
  to: string = AUTH_EMAIL
) => {
  try {
    await transport.sendMail({
      to,
      from: AUTH_EMAIL,
      subject,
      html,
    });
  } catch (error) {
    throw error;
  }
};
