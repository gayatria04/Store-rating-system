import express from "express";
import { submitRating, getUserRatings } from "../controllers/ratingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("USER"), submitRating);
router.get("/my-ratings", protect, authorize("USER"), getUserRatings);

export default router;