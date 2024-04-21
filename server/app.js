import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/index.js";
import { errorMiddleware } from "./middlewares/error.js";
import { Server } from "socket.io";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";
import { createServer } from "http";
import { NEW_MESSAGE } from "./constants/events.js";
import { v4 as uuid } from "uuid";
dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

connectDB(mongoURI);

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// Midllewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Hello Aizen");
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on(NEW_MESSAGE, ({ chatId, members, message }) => {
    const user = {
      _id: "1",
      name:"bfebff"
    }
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name:user.name
      },
      chat: chatId,
      createdAt:new Date().toISOString()
    }

    const messageForDb = {
      content: message,
      sender: user._id,
      chat:chatId
    }

    console.log("New Message :",messageForDb)
  })



  socket.on("disconnect", () => {
    console.log("User disconnected",socket.id)
  });
});
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${envMode} mode`);
});
