import express from "express";
import { signup, login, logout, updateProfile, checkAuth, deleteProfilePic } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";
import { multerUpload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile",protectRoute, multerUpload.single("profilePic"), updateProfile)

router.patch("/remove-profile-pic", protectRoute, deleteProfilePic)

router.get("/check", protectRoute, checkAuth)

router.get("/alive-check", (req, res) => {
  res.status(200).json({ message: "Server is alive" });
});

export default router;
