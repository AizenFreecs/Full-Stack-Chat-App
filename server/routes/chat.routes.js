import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachements,
  getMessages,
} from "../controllers/chat.controllers.js";
import { multerAttachement, userAvatar } from "../middlewares/multer.js";
import {
  addMembersValidator,
  getChatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameGroupValidator,
  sendAttachementsValidator,
  validateHandler,
} from "../utils/validators.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newgroup",userAvatar, newGroupValidator(), validateHandler, newGroupChat);
app.get("/mychats", getMyChats);
app.get("/mygroups", getMyGroups);
app.put("/addmembers", addMembersValidator(), validateHandler, addMembers);
app.delete(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);
app.delete("/leave/:id", getChatIdValidator(), validateHandler, leaveGroup);
app.post(
  "/message",
  multerAttachement,
  sendAttachementsValidator(),
  validateHandler,
  sendAttachements
);
app.get("/message/:id", getChatIdValidator(), validateHandler, getMessages);

app
  .route("/:id")
  .get(getChatIdValidator(), validateHandler, getChatDetails)
  .put(renameGroupValidator(),validateHandler, renameGroup)
  .delete(getChatIdValidator(),validateHandler,deleteChat);

export default app;
