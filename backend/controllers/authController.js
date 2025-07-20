import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationSMS } from "../utils/sms.js";
import { sendVerificationEmail } from "../utils/email.js";
export const signUp = async (req, res) => {

    const { name, email, phoneNo, password } = req.body;
    
    try {
        if (!name || !email || !phoneNo || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({
            $or: [{ email }, { phoneNo }]
        });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            phoneNo,
            password: hashedPassword,
            isVerified: false,
        });

         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
         const refresh = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        user.refreshToken = refresh;

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationToken = verificationCode;
        user.verificationTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        await sendVerificationSMS(user.phoneNo, verificationCode);
        await sendVerificationEmail(user.email, verificationCode);

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};


