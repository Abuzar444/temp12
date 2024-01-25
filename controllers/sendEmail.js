import nodemailer from "nodemailer";

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "ben.faulkner1988@gmail.com",
      pass: "E81IjFXBDAbLk7YH",
    },
  });

  let info = await transporter.sendMail({
    from: ' "WTC Project Tracker" <benjamin.faulkner@ross-eng.com>',
    // to: ["ben.faulkner1988@gmail.com", "madubelasabie@gmail.com"],
    to: req.body.email,
    subject: req.body.subject,
    html: req.body.message,
  });

  res.json(info);
};

export default sendEmail;
