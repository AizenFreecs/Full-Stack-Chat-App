import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/apiError.js";
import { TryCatch } from "./error.js";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["login-token"];

  if (!token) return next(new ErrorHandler("Login Required", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;
  next();
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);
  

    const authToken = socket.request.cookies["login-token"];
    if (!authToken) return next(new ErrorHandler("Login Required", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);
    if (!user) return next(new ErrorHandler("Login Required", 401));

    socket.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Login Required", 401));
  }
};

export { isAuthenticated, socketAuthenticator };
