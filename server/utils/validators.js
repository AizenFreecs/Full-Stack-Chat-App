import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "./apiError.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please enter name.").notEmpty(),
  body("username", "Please enter a username.").notEmpty(),
  body("password", "Please enter a password.").notEmpty(),
  body("bio", "Please enter a bio.").notEmpty(),

];

const loginValidator = () => [
  body("username", "Please enter a username.").notEmpty(),
  body("password", "Please enter a password.").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please enter a name.").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please provide members.")
    .isArray({ min: 2, max: 40 })
    .withMessage("Members must be between 3-40"),
];

const addMembersValidator = () => [
  body("chatId", "please provide a valid chatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members cannot be empty.")
    .isArray({ min: 1, max: 40 })
    .withMessage("Members must be between 1-37"),
];

const removeMemberValidator = () => [
  body("userId", "please provide a valid UserId").notEmpty(),
  body("chatId", "please provide a valid ChatId").notEmpty(),
];

const sendAttachementsValidator = () => [
  body("chatId", "please provide a valid chatId").notEmpty(),

];

const getChatIdValidator = () => [
  param("id", "Please provide a valid ChatId").notEmpty(),
];

const renameGroupValidator = () => [
  body("name", "Please provide a valid name.").notEmpty(),
  param("id", "Please provide a valid ChatId").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please enter  a UserId.").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please enter requestId").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please add accept.")
    .isBoolean()
    .withMessage("Accept must be Boolean"),
];

export {
    acceptRequestValidator, addMembersValidator, getChatIdValidator, loginValidator,
    newGroupValidator, registerValidator, removeMemberValidator, renameGroupValidator, sendAttachementsValidator, sendRequestValidator, validateHandler
};

