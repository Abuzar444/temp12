import mongoose from "mongoose";
import { PROJECT_STATUS, SITE_TYPE } from "../utils/constants.js";

const ProjectSchema = new mongoose.Schema(
  {
    projectNumber: String,
    projectTitle: String,
    chemicals: Array,
    projectStatus: {
      type: String,
    },
    siteType: {
      type: String,
      enum: Object.values(SITE_TYPE),
      default: "WTW",
    },
    location: String,
    contractType: String,
    contractValue: Number,
    designLead: String,
    projectManager: String,
    projectType: String,
    projectStage: String,
    spm: String,
    client: String,
    projectComments: String,
    projectDescription: String,
    projectStart: String,
    projectEnd: String,
    equipment: [
      {
        name: String,
        count: Number,
      },
    ],
    workItems: Array,
    updatedName: String,
    addedName: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updatedBy: String,
    chemical: Array,
    projectPersonnel: Array,
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
