// Entry file for the backend app
// where we register the express app

import cors from "cors"; // Use import instead of require
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import workoutRoutes from "./routes/workouts.js"; // Include .js extension for modules
import userRoutes from "./routes/user.js"; // Include .js extension for modules

// dotenv config to load environment variables
dotenv.config();

// Set up the express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Global middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to DB and then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Start server only if DB connection is successful
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
    process.exit(1); // Exit process if DB connection fails
  });
