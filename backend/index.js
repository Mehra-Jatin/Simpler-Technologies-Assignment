import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors(
  {
    origin: ['http://localhost:5173', process.env.CLIENT_URL], 
    credentials: true, 
  }
));
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes); 
app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});



