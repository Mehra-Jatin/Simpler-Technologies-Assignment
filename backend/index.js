import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./db/connectDB.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});



