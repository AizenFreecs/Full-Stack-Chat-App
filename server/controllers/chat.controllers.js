import {
  ALERT,
  NEW_ATTACHEMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/apiError.js";
import { deleteCloudinaryFiles, emitEvent } from "../utils/features.js";
import { getOtherMember } from "../utils/helper.js";

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(
    ({ _id, name, groupChat, members = [], lastMessage, avatar }) => {
      const otherMember = getOtherMember(members, req.user);
      console.log(otherMember);
      return {
        _id,
        groupChat,
        name: groupChat ? name : otherMember.name,
        avatar: groupChat ? avatar.url : otherMember.avatar.url,

        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    }
  );

  res.status(200).json({
    success: true,
    message: transformedChats,
  });
});

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;
  const avatar = { public_id: "sdjbfsjbf", url: "ejbfeiwubfiuwebf" };
  if (members.length < 2)
    return next(new ErrorHandler("Group must have at least 3 members.", 400));

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
    avatar: avatar,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group.`);
  emitEvent(req, REFETCH_CHATS, members);

  res.status(201).json({
    success: true,
    message: "Group created successfully",
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const myGroups = chats.map(({ _id, groupChat, name, avatar }) => {
    return {
      _id,
      name,
      groupChat,
      avatar,
    };
  });
  res.status(200).json({
    success: true,
    message: myGroups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members = [] } = req.body;
  const chat = await Chat.findById(chatId);

  if (!members || members.length < 1)
    return next(new ErrorHandler("Members list cannot be empty"), 400);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat) next(new ErrorHandler("This is not a Group Chat", 400));
  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("Not authorized to make changes on this chat", 403)
    );

  const allNewMembersPromise = members.map((item) =>
    User.findById(item, "name")
  );
  const allNewMembers = await Promise.all(allNewMembersPromise);

  const newMembers = allNewMembers
    .filter((item) => !chat.members.includes(item._id.toString()))
    .map((item) => item._id);

  chat.members.push(...newMembers);

  if (chat.members.length > 40)
    return next(new ErrorHandler("Memeber limit reached", 400));

  await chat.save({ validateModifiedOnly: true });

  const allUsersName = allNewMembers.map((item) => item.name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `Follwing user have been added to the group : ${allUsersName}`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added succesfully",
  });
});

const removeMember = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;
  const [chat, removedUser] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group", 400));
  if (!removedUser) return next(new ErrorHandler("User not found", 404));

  if (chat.members.length <= 3)
    return next(new ErrorHandler("Group must have atleast 3 members.", 400));

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  chat.save({ validateModifiedOnly: true });

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${removedUser} has been removed from the group.`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Member succesfully removed.",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  const user = await User.findById(req.user);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group", 400));
  if (!chat.members.includes(req.user))
    return next(
      new ErrorHandler("The user is not a member of the group.", 400)
    );

  const remainingMembers = chat.members.filter(
    (item) => item.toString() !== req.user.toString()
  );
  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have atleast 3 Members.", 400));

  if (chat.creator.toString() === req.user.toString()) {
    const randomNumber = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomNumber];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  await chat.save({ validateModifiedOnly: true });

  emitEvent(req, ALERT, chat.members, `${user} has left the group.`);
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "User left the group succesfully",
  });
});

const sendAttachements = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const files = req.files || [];

  if (files.length < 1)
    return next(new ErrorHandler("Please upload attachements", 404));
  if(files.length >10) return next(new ErrorHandler("Files can't be more than 5",400))

  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);

  const attachements = [];

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const msgForRealTime = {
    content: "",
    attachements,
    sender: {
      id: user._id,
      name: user.name,
    },
    chat: chatId,
  };

  const msgForDb = {
    content: "",
    attachements,
    sender: user._id,
    chat: chatId,
  };

  const msg = await Message.create(msgForDb);

  emitEvent(req, NEW_ATTACHEMENT, chat.members, {
    message: msgForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    msg,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();
    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) next(new ErrorHandler("Chat not found.", 404));
  if (!chat.groupChat)
    next(new ErrorHandler("Only group name can be modified.", 400));
  if (chat.creator.toString() !== req.user.toString())
    next(new ErrorHandler("You are not authorised to change the name.", 404));

  chat.name = name;

  await chat.save();

  return res.status(200).json({
    success: true,
    message: `The group was renamed succesfully to ${name}`,
  });
});

const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = Chat.findById(chatId);
  if (!chat) next(new ErrorHandler("Chat not found.", 404));

  const members = chat.members;

  if (chat.groupChat && chat.create.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to delete the group.", 403)
    );

  if (chat.groupChat && !chat.members.includes(req.user.toString()))
    return next(
      new ErrorHandler("You are not allowed to delete the group.", 403)
    );

  // Clear all data from database rekated to the chat

  const msgsWithAttachements = await Message.find({
    chat: chatId,
    attachements: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  msgsWithAttachements.forEach((attachements) => {
    attachements.forEach(({ public_id }) => public_ids.push(public_id));
  });

  await Promise.all([
    // Delete files from cloudinary
    deleteCloudinaryFiles(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;
  const limit = 20;
  const skip = (page - 1) * limit;

  const [messages, totalMessageCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessageCount / limit);

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
});
export {
  addMembers, deleteChat, getChatDetails, getMessages, getMyChats,
  getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachements
};

