import express from "express";
import { getSalesSummary } from "../controllers/adminDashboardController.js";

const router = express.Router();

// 🧾 Route for sales chart data
router.get("/sales-summary", getSalesSummary);

export default router;
