import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import mongoose from "mongoose";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    // when you're returning multiple middlewares as is the case here, you put what you return in square brackets
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateProjectInput = withValidationErrors([
  body("projectNumber")
    .notEmpty()
    .withMessage("project number is required")
    .isLength({ min: 5, max: 5 })
    .withMessage("project number needs to be 5 numbers long")
    .custom(async (projectNumber) => {
      const projectFound = await Project.findOne({ projectNumber });
      if (projectFound) {
        throw new BadRequestError("project number already exists");
      }
    }),
  body("projectTitle").notEmpty().withMessage("project title is required"),
]);

export const validateIdParam = withValidationErrors([
  // "id" comes from what you have set the param in the route so it needs to match
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const project = await Project.findById(value);
    if (!project) throw new NotFoundError(`no project with id: ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === project.createdBy.toString();

    let isManager;
    if (req.user.name + " " + req.user.lastName === project.projectManager) {
      isManager = true;
    }
    if (!isAdmin && !isOwner && !isManager)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),

  body("lastName").notEmpty().withMessage("last name is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
