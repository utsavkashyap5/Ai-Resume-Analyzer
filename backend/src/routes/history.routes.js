import express from "express";
import { protect } from './../middleware/auth.middleware.js';
import { getAnalysisHistory,deleteAnalysis} from "../controllers/history.controller.js";

const router = express.Router();

router.get(
    "/",
    protect,
    getAnalysisHistory
);

router.delete(
    "/:analysisId",
    protect,
    deleteAnalysis
);

export default router;