import express from "express";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createUser } from "./seeders/user.seed.js";

import userRoutes from "./routes/user.routes.js";
import chatRoutes from './routes/chat.routes.js'

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

connectDB(mongoURI);


const app = express();

// Midllewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", userRoutes);
app.use("/chat",chatRoutes)


app.get("/", (req, res) => {
  res.send("Hello Aizen");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
