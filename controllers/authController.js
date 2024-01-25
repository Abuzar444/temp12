import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";
import sendResetPasswordEmail from "../utils/sendResetPasswordEmail.js";
import { BadRequestError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const { email } = req.body;
  let getDomainName = email.substring(email.indexOf("@") + 1);
  let getlcDomainName = getDomainName.toLowerCase();

  if (
    !getlcDomainName.includes("ross-eng") &&
    !getlcDomainName.includes("envoygroup")
  ) {
    throw new BadRequestError(
      "must be a ross-eng or envoy group email address"
    );
  }

  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create({ ...req.body, verificationToken });

  // const origin = "http://localhost:5173";
  const origin = "https://wtc-project-tracker.onrender.com";

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  // send verification token back only while testing
  res.status(StatusCodes.CREATED).json({
    msg: "Success!! Please check your email to verify account",
  });
};

export const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });
  console.log("bla bla", user.verificationToken);

  if (!user) {
    throw new UnauthenticatedError("verification failed");
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("verification failed");
  }

  user.isVerified = true;
  user.verified = Date.now();
  // user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({
    verificationToken,
    email,
    user,
    msg: "email verified",
  });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  if (!user.isVerified) {
    throw new UnauthenticatedError("Please Verify Your Email");
  }

  const token = createJWT({
    userId: user._id,
    role: user.role,
    name: user.name,
    lastName: user.lastName,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.send({ token });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide valid email");
  }

  let getDomainName = email.substring(email.indexOf("@") + 1);
  let getlcDomainName = getDomainName.toLowerCase();

  if (
    !getlcDomainName.includes("ross-eng") &&
    !getlcDomainName.includes("envoygroup")
  ) {
    throw new BadRequestError(
      "must be a ross-eng or envoy group email address"
    );
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email

    //const origin = "http://localhost:5173";
    const origin = "https://wtc-project-tracker.onrender.com";
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const twentyMinutes = 2000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + twentyMinutes);

    user.passwordToken = passwordToken;
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

export const resetPassword = async (req, res) => {
  let { token, email, password } = req.body;

  if (!email || !token || !password) {
    throw new BadRequestError("Please provide all values");
  }

  if (password.length < 8) {
    throw new BadRequestError("Password must be 8 characters or more");
  }

  let hashedPassword2 = await hashPassword(password);
  password = hashedPassword2;

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === token &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.send("reset password");
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
