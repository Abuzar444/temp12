import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";

export const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.body });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const projects = await Project.countDocuments();
  res.status(StatusCodes.OK).json({ users, projects });
};

export const updateUser = async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.user.userId, req.body);
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
