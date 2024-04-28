import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "./helper.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
  path: "/",
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("login-token", token, cookieOptions).json({
    success: true,
    user,
    token,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const userSockets = getSockets(users);
  io.to(userSockets).emit(event, data);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);
    const formatedresults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    console.log("formatedResults : ", formatedresults);
    return formatedresults;
  } catch (error) {
    throw new Error("Error in uploading files to cloudinary.", error);
  }
};

const deleteCloudinaryFiles = async (public_ids) => {};

export {
  sendToken,
  cookieOptions,
  emitEvent,
  deleteCloudinaryFiles,
  uploadFilesToCloudinary,
};
