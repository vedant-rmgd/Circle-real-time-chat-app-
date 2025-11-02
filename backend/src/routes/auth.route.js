import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile",protectRoute, multerUpload.single("profilePic"), updateProfile)

export default router;
