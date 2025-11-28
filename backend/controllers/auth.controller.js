import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const protect = catchAsync(async (req, res, next) => {
  console.log("🔐 Auth middleware (protect) triggered");

  // Get from headers OR body (for sync route)
  const userId = req.headers["user-id"] || req.body.clerkId;
  const userEmail = req.headers["user-email"] || req.body.email;

  console.log("Auth check:", { userId, userEmail });

  if (!userId || !userEmail) {
    console.log(" Missing user ID or email");
    return new AppError("User ID and Email required", 401);
  }

  // Find or create user - FIXED LOGIC
  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    console.log("🆕 Creating new user in database");
    // Check if this is the admin email
    const isAdmin = userEmail === "ininsico@gmail.com";
    const role = isAdmin ? "admin" : "user";

    user = new User({
      clerkId: userId,
      email: userEmail,
      role: role,
      lastLogin: new Date(),
    });

    await user.save();
    console.log(`✅ User created: ${user.email} as ${role}`);
  } else {
    console.log("📝 Updating existing user last login");
    // Update last login for existing user
    user.lastLogin = new Date();
    await user.save();
  }

  req.user = user;
  next();
});

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin")
    return new AppError("Admin access required", 403);

  next();
};
