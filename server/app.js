import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/index.js";
import { errorMiddleware } from "./middlewares/error.js";
import { Server } from "socket.io";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING, STOP_TYPING } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./utils/helper.js";
import { Message } from "./models/message.model.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";
dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

connectDB(mongoURI);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
app.set("io",io)
const userSocketIds = new Map();



// Midllewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.get("/", (req, res) => {
  res.send("Hello Aizen");
});

// Socket IO from here
io.use((socket, next) => {
 
  cookieParser()(socket.request, socket.request.res, async (err) => {
    await socketAuthenticator(err, socket, next);
  });
});

io.on("connection", (socket) => {
  const user = socket.user;
 
  userSocketIds.set(user._id.toString(), socket.id);

  console.log("A user connected", userSocketIds);
  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    console.log(message)
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDb = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });

    try {
      await Message.create(messageForDb);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on(START_TYPING, ({ members, chatId }) => {
    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(START_TYPING, { chatId });
  })

  socket.on(STOP_TYPING, ({ members, chatId }) => {
    const membersSockets = getSockets(members);
    
    socket.to(membersSockets).emit(STOP_TYPING, { chatId });
  })

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    userSocketIds.delete(user._id.toString());
  });
});
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${envMode} mode`);
});

export { userSocketIds };
