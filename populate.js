import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Project from "./models/projectModel.js";
import User from "./models/userModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "ben.faulkner1988@gmail.com" });
  const jsonProjects = JSON.parse(
    await readFile(new URL("./utils/projectMockData.json", import.meta.url))
  );
  const projects = jsonProjects.map((project) => {
    return { ...project, createdBy: user._id };
  });
  await Project.deleteMany({ createdBy: user._id });
  // await Project.create(projects);
  console.log("successfully added mock data");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
