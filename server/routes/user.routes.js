import express from "express";
import { getProfile, login, logout, newUser, searchUser } from "../controllers/user.controllers.js";
import { connectDB } from "../db/index.js";
import { multerUpload,userAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();



app.post("/new", userAvatar, newUser);
app.post("/login", login)

// authentication required from here on
app.use(isAuthenticated)

app.get("/profile", getProfile)
app.get("/logout", logout)
app.get("/search",searchUser)


export default app;
