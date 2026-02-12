import express from "express";
import { submitRating } from "../controllers/rating.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("USER"), submitRating);

export default router;
