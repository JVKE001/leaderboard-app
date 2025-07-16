import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//Route imports
import userRoutes from "./routes/Routes.js";
import claimRoutes from "./routes/Routes.js";

const app = express();

// Load environment variable
dotenv.config({ path: "./config.env" });

connectDB();

app.use(express.json());

// Mount route handlers
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/auth", claimRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.bgGreen);
});
