import express from "express";
import { getDashboardStats } from "../Controllers/dashboardController.js";
import { TeacherAuth } from "../../middleware/auth.js";

const router = express.Router();

router.get("/stats",TeacherAuth, getDashboardStats);

export default router;