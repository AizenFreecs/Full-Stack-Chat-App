import express from "express";
import userRoute from "./routes/user.routes.js"

const app = express()

app.use("/user",userRoute)

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})