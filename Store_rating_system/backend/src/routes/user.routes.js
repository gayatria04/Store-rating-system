import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updatePassword
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();


router.post("/", protect, authorize("ADMIN"), createUser);
router.get("/", protect, authorize("ADMIN"), getAllUsers);
router.get("/:id", protect, authorize("ADMIN"), getUserById);

router.put("/update-password", protect, updatePassword);

export default router;
