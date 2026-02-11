import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updatePassword
} from "../controllers/user.controller.js";


const router = express.Router();


router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.put("/update-password", updatePassword);

export default router;
