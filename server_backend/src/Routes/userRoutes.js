import { Router } from "express";
import {
  signup,
  login,
  getUserProfile,
  logout,
} from "../Controllers/userController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/userdata", authMiddleware, getUserProfile);
router.get("/logout", authMiddleware, logout);

export default router;
