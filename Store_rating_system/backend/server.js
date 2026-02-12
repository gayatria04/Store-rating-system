import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import storeRoutes from "./src/routes/storeRoutes.js";
import ratingRoutes from "./src/routes/ratingRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));