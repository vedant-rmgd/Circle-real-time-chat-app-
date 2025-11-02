import express from "express";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";
import { multerUpload } from "../middlewares/multer.middleware.js";
import { getUsersForSideBar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router()

router.get("/get-users", protectRoute, getUsersForSideBar)
router.get("/get-message/:id", protectRoute, getMessages)
router.post("/send-message/:id", protectRoute, multerUpload.single("image"), sendMessage)

export default router