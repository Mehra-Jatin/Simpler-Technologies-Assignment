import express from "express";
import { login, loginWithRefreshToken, logout, signUp, verifyUser ,getMe} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();



router.post('/signup', signUp);
router.post('/login',login);
router.post('/refresh-token', loginWithRefreshToken);
router.post('/logout', logout);
router.post('/verify',verifyUser);
router.get('/me', authMiddleware, getMe);


export default router;