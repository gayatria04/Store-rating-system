import express from "express";
import {
  createStore,
  getAllStores,
  getStoreDashboard
} from "../controllers/store.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";


const router = express.Router();

router.post("/", protect, authorize("ADMIN"), createStore);

router.get("/", protect, authorize("ADMIN"), getAllStores);

router.get("/owner/dashboard",
  protect,
  authorize("STORE_OWNER"),
  getStoreDashboard
);

export default router;
