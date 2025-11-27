import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./backend/dbConfig.js";

dotenv.config();

const app = express();

const ENVIRONMENT = process.env.VITE_NODE_ENV || "development";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `server running at http://localhost:${PORT} at ${ENVIRONMENT} mode!`
  );
  connectDB();
});
