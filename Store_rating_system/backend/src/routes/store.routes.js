import express from "express";
import {
  createStore,
  getAllStores,
  getStoreDashboard
} from "../controllers/store.controller.js";


const router = express.Router();

router.post("/", createStore);

router.get("/", getAllStores);

router.get("/owner/dashboard",
  getStoreDashboard
);

export default router;
