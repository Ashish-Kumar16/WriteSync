import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import blockRoutes from "./routes/blockRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your client’s origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Include PATCH
    credentials: true, // Optional: if you need cookies or authentication
  }),
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/pages", blockRoutes);

// Error handling
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
