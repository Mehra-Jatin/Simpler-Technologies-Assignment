import express from "express";
import { login, loginWithRefreshToken, logout, signUp, verifyUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();



router.post('/signup', signUp);
router.post('/login',login);
router.post('/refresh-token', loginWithRefreshToken);
router.post('/logout', authMiddleware, logout);
router.post('/verify',verifyUser);

export default router;