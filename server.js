import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cardRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // Serving static files
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Listen to the port provided by Vercel (or fallback to 4000 for local development)
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

// Export the app for serverless deployment compatibility
export default app;
