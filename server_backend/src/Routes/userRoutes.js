import { Router } from "express";
import {
  signup,
  login,
  getUserProfile,
  logout,
  checkAuth,
} from "../Controllers/userController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/userdata", authMiddleware, getUserProfile);
router.get("/logout", authMiddleware, logout);
router.get("/checkAuth", authMiddleware, checkAuth);

export default router;
