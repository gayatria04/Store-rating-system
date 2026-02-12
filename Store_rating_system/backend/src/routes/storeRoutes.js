import express from "express";
import { createStore, getAllStores, getStoreDashboard } from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("ADMIN"), createStore);
router.get("/", protect, authorize("USER", "ADMIN"), getAllStores);
router.get("/owner/dashboard", protect, authorize("STORE_OWNER"), getStoreDashboard);

export default router;