import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig.js";

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: ' "WTC Project Tracker" <ben.faulkner1988@gmail.com>',
    // to: ["ben.faulkner1988@gmail.com", "madubelasabie@gmail.com"],
    to,
    subject,
    html,
  });
};

export default sendEmail;
