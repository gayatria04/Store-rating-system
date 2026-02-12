import express from "express";
import { getDashboardStats, getAllStoresAdmin } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/dashboard/stats", protect, authorize("ADMIN"), getDashboardStats);
router.get("/stores", protect, authorize("ADMIN"), getAllStoresAdmin);

export default router;