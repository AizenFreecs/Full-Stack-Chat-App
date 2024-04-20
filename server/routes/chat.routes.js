import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controllers/chat.controllers.js";

const app = express.Router();

app.use(isAuthenticated)

app.post("/newgroup",newGroupChat)

export default app