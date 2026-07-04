import express from 'express';

import { uploadResume} from '../controllers/upload.Controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
    "/",
    protect,
    upload.single("resume"),
    uploadResume
);

export default router;