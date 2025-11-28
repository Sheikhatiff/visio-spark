import dotenv from "dotenv";
import { connectDB } from "./database/dbConfig.js";
import app from "./app.js";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config();

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.VITE_NODE_ENV || "development";

const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${ENVIRONMENT} mode on http://localhost:${PORT}`
  );
  connectDB();
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
