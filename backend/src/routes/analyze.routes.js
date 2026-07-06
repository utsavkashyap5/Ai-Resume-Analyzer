import express from "express";
import { protect } from './../middleware/auth.middleware.js';
import { analyzeResumeController } from "../controllers/analyze.controller.js";
import aiRateLimiter from "../middleware/rateLimiter.middleware.js";
const router = express.Router();

router.post(
    "/:resumeId",
    protect,
    aiRateLimiter,
    analyzeResumeController
);

export default router;