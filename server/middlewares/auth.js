import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/apiError.js";
import { TryCatch } from "./error.js";

const isAuthenticated = async (req, res, next) => {

  const token = req.cookies["login-token"];

  if (!token) return next(new ErrorHandler("Login Required", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;
  next();
};

export { isAuthenticated };
