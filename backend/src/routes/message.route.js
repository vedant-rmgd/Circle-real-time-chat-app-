import express from "express";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const router = express.Router()

router.get("/get-users", protectRoute, getUsersForSideBar)

export default router