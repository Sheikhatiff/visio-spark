import express from "express";
import {
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  sync,
  updateUserRole,
} from "../controllers/user.controller.js";
import { protect, requireAdmin } from "../controllers/auth.controller.js";

const userRouter = express.Router();

userRouter.post("/sync", sync);

userRouter.use(protect);

userRouter.get("/me", getMe);
userRouter.get("/:id", getUser);

userRouter.use(requireAdmin);

userRouter.get("/", getAllUsers);
userRouter.patch("/:id/role", updateUserRole);
userRouter.delete("/:id", deleteUser);

export default userRouter;
