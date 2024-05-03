import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/apiError.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../utils/helper.js";

// Create user and save to database and cookie
const newUser = TryCatch(async (req, res, next) => {
 
  const { name, username, password, bio } = req.body;
  const file = req.file;
  if (!file)
    return next(new ErrorHandler("Please upload a valid avatar.", 401));

  const result = await uploadFilesToCloudinary([file]);

  const avatar = { public_id: result[0].public_id, url: result[0].url };

  const user = await User.create({
    name,
    username,
    bio,
    password,
    avatar: avatar,
  });

  sendToken(res, user, 201, "User created Succesfully.");
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Credentials", 404));

  const isPasswordMatching = await compare(password, user.password);
  if (!isPasswordMatching)
    return next(new ErrorHandler("Invalid Credentials", 404));

  sendToken(res, user, 200, `Welcome Back ${user.name}`);
});

const getProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("User not found.", 404));

  const friends = await Chat.countDocuments({
    groupChat: false,
    members: req.user,
  });

  res.status(200).json({
    success: true,
    user,
    friendsCount: friends,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("login-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out Succesfully",
    });
});

const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  const myChats = await Chat.find({ groupChat: false, members: req.user });

  // finding all my friends
  const myFriends = myChats.flatMap((chat) => chat.members);

  // getting rest of the users in the database
  const allUsersExceptSelfandFriends = await User.find({
    _id: { $nin: myFriends },
    name: { $regex: name, $options: "i" },
  });

  // list of queried users
  const users = allUsersExceptSelfandFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request allready sent.", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId], "Request Sent");

  return res.status(200).json({
    success: true,
    message: "Friend Request sent Succesfully.",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");
  
  

  if (!request) return next(new ErrorHandler("Request not found.", 404));
  if (request.receiver._id.toString() !== req.user.toString())
    return next(new ErrorHandler("Not authorized to accept this request", 401));

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected.",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted.",
    senderId: request.sender._id,
  });
});

const getAllNotifications = TryCatch(async (req, res, next) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allRequests,
  });
});

const getMyFriends = TryCatch(async (req, res, next) => {
  const chatId = req.query.chatId;
  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);
    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    return res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  }

  return res.status(200).json({
    success: true,
    friends,
  });
});

export {
  login,
  newUser,
  getProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
};
