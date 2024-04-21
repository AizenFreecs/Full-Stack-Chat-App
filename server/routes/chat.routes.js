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
  getMessages
} from "../controllers/chat.controllers.js";
import { multerAttachement } from "../middlewares/multer.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newgroup", newGroupChat);
app.get("/mychats", getMyChats);
app.get("/mygroups", getMyGroups);
app.put("/addmembers", addMembers);
app.delete("/removemember", removeMember);
app.delete("/leave/:id", leaveGroup);
app.post("/message", multerAttachement, sendAttachements);
app.get("/message/:id", getMessages);

app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;
