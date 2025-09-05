// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./db.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
connectdb();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => res.send("Backend is running"));

// Use order routes
app.use("/api/orders", orderRoutes);
// Use auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
