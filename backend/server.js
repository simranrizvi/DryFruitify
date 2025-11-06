import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";

dotenv.config();
const app = express();

// ✅ Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Allowed Origins (localhost + future frontend deploy)
const allowedOrigins = [

  "http://localhost:3000", // local
  "https://khalista-natural.vercel.app", // production
  "https://khalista-natural-8v2aj0069-imrans-projects-91b0c78b.vercel.app", // preview
]

// ✅ CORS config
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // ✅ allow cookies
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Connect DB
connectDB();

// ✅ Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminDashboardRoutes);

// ✅ Health check route (optional for testing Render)
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
