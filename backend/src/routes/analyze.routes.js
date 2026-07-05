import express from "express";
import { protect } from './../middleware/auth.middleware.js';
import { analyzeResumeController } from "../controllers/analyze.controller.js";

const router = express.Router();

router.post(
    "/:resumeId",
    protect,
    analyzeResumeController
);

export default router;