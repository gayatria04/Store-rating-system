import express from "express";
import { createUser, getAllUsers, getUserById, updatePassword } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("ADMIN"), createUser);
router.get("/", protect, authorize("ADMIN"), getAllUsers);
router.get("/:id", protect, authorize("ADMIN"), getUserById);
router.put("/update-password", protect, updatePassword);

export default router;