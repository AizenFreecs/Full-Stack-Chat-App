import express from "express";
import { acceptFriendRequest, getAllNotifications, getMyFriends, getProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/user.controllers.js";
import { connectDB } from "../db/index.js";
import { multerUpload,userAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { registerValidator,validateHandler,loginValidator, sendRequestValidator,acceptRequestValidator } from "../utils/validators.js";

const app = express.Router();



app.post("/register", userAvatar,registerValidator(),validateHandler, newUser);
app.post("/login",loginValidator(),validateHandler, login)

// authentication required from here on
app.use(isAuthenticated)

app.get("/profile", getProfile)
app.get("/logout", logout)
app.get("/search", searchUser)
app.put("/sendrequest", sendRequestValidator(), validateHandler, sendFriendRequest)
app.put("/acceptrequest",acceptRequestValidator(),validateHandler, acceptFriendRequest)
app.get("/notifications", getAllNotifications)
app.get("/friends",getMyFriends)

export default app;
