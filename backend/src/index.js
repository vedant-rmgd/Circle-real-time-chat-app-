import express from "express";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messsageRoute from "./routes/message.route.js";
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // this allow us to accept cooies from frontend
}))

// ROUTES ->
app.use("/api/auth", authRoute);
app.use("/api/message", messsageRoute);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
    connectDB();
});
