import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";

//might be later use
// import path from "path";
// import { fileURLToPath } from "url";

import globalErrorHandler from "./controllers/errorController.js";
import userRouter from "./routes/user.routes.js";
import {
  checkHealth,
  createTestUser,
  getAllUsersForDebugging,
  initAdmin,
  testDBConnection,
} from "./controllers/user.controller.js";
import productRouter from "./routes/product.routes.js";

const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// --------------------
// Rate Limiting
// --------------------
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
  validate: { trustProxy: false },
});

app.use("/api", limiter);

// --------------------
// Parsing & Static
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  console.log("📋 Headers:", req.headers);
  console.log("📦 Body:", req.body);
  req.requestTime = new Date().toISOString();
  next();
});

// --------------------
// API Routes
// --------------------
app.get("/api/test-db", testDBConnection);
app.post("/api/force-create-user", createTestUser);
app.post("/api/init-admin", initAdmin);
app.get("/api/debug/users", getAllUsersForDebugging);
app.get("/api/health", checkHealth);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// --------------------
// Global Error Handler
// --------------------
app.use(globalErrorHandler);

export default app;
