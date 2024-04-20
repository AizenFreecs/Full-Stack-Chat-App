import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/apiError.js";

// Create user and save to database and cookie
const newUser = async (req, res) => {
  const avatar = { public_id: "sdjbfsjbf", url: "ejbfeiwubfiuwebf" };
  const { name, username, password, bio } = req.body;
  console.log(req.body);
  const user = await User.create({
    name,
    username,
    bio,
    password,
    avatar,
  });
  sendToken(res, user, "201", "User created Succesfully.");
};

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Credentials", 404));

  const isPasswordMatching = await compare(password, user.password);
  if (!isPasswordMatching)
    return next(new ErrorHandler("Invalid Credentials", 404));

  sendToken(res, user, 200, `Welcome Back ${user.name}`);
});

const getProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user
  });
});

const logout = TryCatch(async (req, res) => {
  return res.status(200).cookie("login-token", "", { ...cookieOptions, maxAge: 0 }).json({
    success: true,
    message:"Logged out Succesfully"
  })
});

const searchUser = TryCatch(async (req, res) => {
  const {name} = req.query
  return res.status(200).json({
    success: true,
    message:"Searching User"
  })
});

export { login, newUser, getProfile, logout, searchUser };
