import express from "express";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messsageRoute from "./routes/message.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// ROUTES ->
app.use("/api/auth", authRoute);
app.use("/api/message", messsageRoute);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
    connectDB();
});
