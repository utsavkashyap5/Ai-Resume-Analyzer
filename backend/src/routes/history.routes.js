import express from "express";
import { protect } from './../middleware/auth.middleware.js';
import { getAnalysisHistory } from "../controllers/history.controller.js";

const router = express.Router();

router.get(
    "/",
    protect,
    getAnalysisHistory
);

export default router;