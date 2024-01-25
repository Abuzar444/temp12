import Project from "../models/projectModel.js";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllProjects = async (req, res) => {
  const {
    search,
    projectNumber,
    projectTitle,
    projectStatus,
    contractType,
    siteType,
    client,
    location,
    equipment,
    chemical,
    sort,
    projectPersonnel,
  } = req.query;
  const queryObject = {
    // createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { projectNumber: { $regex: search, $options: "i" } },
      { projectTitle: { $regex: search, $options: "i" } },
      { projectStatus: { $regex: search, $options: "i" } },
      { siteType: { $regex: search, $options: "i" } },
      { contractType: { $regex: search, $options: "i" } },
      { projectManager: { $regex: search, $options: "i" } },
      { spm: { $regex: search, $options: "i" } },
      { client: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { designLead: { $regex: search, $options: "i" } },
    ];
  }

  if (projectNumber) {
    queryObject.projectNumber = projectNumber;
  }
  if (projectTitle) {
    queryObject.$or = [
      { projectTitle: { $regex: projectTitle, $options: "i" } },
    ];
  }

  if (projectStatus && projectStatus !== "Any") {
    queryObject.projectStatus = projectStatus;
  }

  if (contractType && contractType !== "All") {
    queryObject.contractType = contractType;
  }
  if (location && location !== "All") {
    queryObject.location = location;
  }
  if (client && client !== "All") {
    queryObject.client = client;
  }
  if (siteType && siteType !== "All") {
    queryObject.siteType = siteType;
  }
  if (chemical && chemical !== "All") {
    queryObject.chemicals = { $all: chemical };
  }
  if (equipment && equipment !== "All") {
    queryObject.equipment = {
      $elemMatch: { name: equipment, count: { $gte: 1 } },
    };
  }

  if (projectPersonnel && projectPersonnel !== "All Projects") {
    queryObject.projectPersonnel = {
      $all: projectPersonnel,
    };
  }

  const sortOptions = {
    SiteType: "siteType",
    SiteType2: "-siteType",
    ContractType: "contractType",
    ContractType2: "-contractType",
    Chemical: "chemical",
    Chemical2: "-chemical",
    Location: "location",
    Location2: "-location",
    Location2: "-location",
    Client: "client",
    Client2: "-client",
    PM: "projectManager",
    PM2: "-projectManager",
    SPM: "spm",
    SPM2: "-spm",
    DesignLead: "designLead",
    DesignLead2: "-designLead",
    ProjectStage: "projectStatus",
    ProjectStage2: "-projectStatus",
    ContractValue: "contractValue",
    ContractValue2: "-contractValue",
    ProjectAdded: "createdAt",
    ProjectAdded2: "-createdAt",
    LastUpdated: "updatedAt",
    LastUpdated2: "-updatedAt",
    ProjectNumber: "projectNumber",
    ProjectNumber2: "-projectNumber",
    ProjectDescription: "projectTitle",
    ProjectDescription2: "-projectTitle",
  };

  const sortKey =
    sortOptions[sort ? sort.replace(/\s+/g, "") : sort] ||
    sortOptions.ProjectAdded;

  // Set up pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 26;
  const skip = (page - 1) * limit;

  // const projects = await Project.find(queryObject);

  const projects = await Project.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalProjects = await Project.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProjects / limit);

  res
    .status(StatusCodes.OK)
    .json({ projects, totalProjects, numOfPages, currentPage: page });
};

export const createProject = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const project = await Project.create(req.body);
  res.status(200).json({ project });
};

export const getProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  res.status(StatusCodes.OK).json({ project });
};
export const getInfoProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  res.status(StatusCodes.OK).json({ project });
};

export const updateSingleProject = async (req, res) => {
  const { id } = req.params;
  req.body.updatedBy = req.user.userId;
  const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ project: updatedProject });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const removedProject = await Project.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: removedProject });
};

export const showStats = async (req, res) => {
  let stats = await Project.aggregate([
    // { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$projectStatus", count: { $sum: 1 } } },
  ]);

  let locationStats = await Project.aggregate([
    { $group: { _id: "$location", count: { $sum: 1 } } },
  ]);

  let totalProjects = await Project.countDocuments();

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  // The stats array goes through the reduce function. Each item in the array runs through the function.
  // 'curr' refers to the current value. The curr value is added to the acc for the next round
  // So in this example, curr is an object within an array - {_id: title, count} e.g. {_id: 'Workshop', count: 2}
  // When we put this through the function above, we first destructure count and _id (rename it title)
  // acc, which for the first round

  locationStats = locationStats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  // initial value is an empty object
  // so your array is something like [{_id: 'design', count: 19}, {_id: 'construction', count: 21}]
  // remember acc and curr are objects. curr[0] = design and curr[1] = 19
  // the acc object is getting a property of title added to it so acc = {'design': 19}
  // this is repeated and an object with multiple properties is created
  // the first object goes through the reducer, we pull out some values from the initial

  const defaultStats = {
    Design: stats.Design || 3,
    Workshop: stats.Workshop || 0,
    Site: stats["Site"] || 0,
    "Site Survey": stats["Site Survey"] || 0,
  };

  const defaultLocationStats = {
    ScotlandSouth: locationStats["Scotland South"] || 3,
    Workshop: locationStats["Aberdeen and North East"] || 0,
    Site: stats.Site || 0,
  };

  // getting the monthly contract amounts for a specific user, grouping them by year and month, sorting them by latest year and month and limiting it to 6 responses

  let monthlyContractAmounts = await Project.aggregate([
    // { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "id.month": -1 } },
    { $limit: 6 },
  ]);

  let yourLiveProjects = await Project.aggregate([
    {
      $match: {
        projectPersonnel: { $eq: req.user.name + " " + req.user.lastName },
      },
    },
  ]);

  monthlyContractAmounts = monthlyContractAmounts
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyContractAmounts,
    defaultLocationStats,
    totalProjects,
    yourLiveProjects,
  });
};
