import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const sync = catchAsync(async (req, res, next) => {
  console.log("🔄 Sync route triggered", req.body);
  const { clerkId, email, firstName, lastName, profileImage } = req.body;

  if (!clerkId || !email) {
    return new AppError("clerkId and email required", 400);
  }
  // Check if this is the admin email
  const isAdmin = email === "ininsico@gmail.com";
  const role = isAdmin ? "admin" : "user";
  // Find or create user
  let user = await User.findOne({ clerkId: clerkId });

  if (!user) {
    console.log("🆕 Creating new user in database via sync");
    user = new User({
      clerkId: clerkId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName || ""} ${lastName || ""}`.trim(),
      profileImage: profileImage,
      role: role,
      lastLogin: new Date(),
    });
  } else {
    console.log("📝 Updating existing user via sync");
    // Update user data
    user.firstName = firstName;
    user.lastName = lastName;
    user.fullName = `${firstName || ""} ${lastName || ""}`.trim();
    user.profileImage = profileImage;
    user.lastLogin = new Date();
  }

  await user.save();
  console.log(`✅ User synced: ${user.email} as ${user.role}`);

  res.json({
    success: true,
    user: {
      id: user.clerkId,
      email: user.email,
      role: user.role,
      isAdmin: user.role === "admin",
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
    },
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  res.json({
    id: req.user.clerkId,
    email: req.user.email,
    role: req.user.role,
    isAdmin: req.user.role === "admin",
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profileImage: req.user.profileImage,
    lastLogin: req.user.lastLogin,
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const query = {
    isActive: true,
    $or: [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  const users = await User.find(query)
    .select("-__v")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.json({
    users: users.map((user) => ({
      id: user.clerkId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
    })),
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ clerkId: req.params.id }, { _id: req.params.id }],
    isActive: true,
  }).select("-__v");

  if (!user) {
    return new AppError("User not found", 404);
  }

  // Users can only see their own profile unless they're admin
  if (req.user.role !== "admin" && user.clerkId !== req.user.clerkId) {
    return new AppError("Access denied", 403);
  }

  res.json({
    id: user.clerkId,
    email: user.email,
    role: user.role,
    isAdmin: user.role === "admin",
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
    lastLogin: user.lastLogin,
  });
});

export const updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const user = await User.findOneAndUpdate(
    {
      $or: [{ clerkId: req.params.id }, { _id: req.params.id }],
      isActive: true,
    },
    { role },
    { new: true }
  ).select("-__v");

  if (!user) {
    return new AppError("User not found", 404);
  }

  res.json({
    id: user.clerkId,
    email: user.email,
    role: user.role,
    isAdmin: user.role === "admin",
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ clerkId: req.params.id }, { _id: req.params.id }],
    isActive: true,
  });

  if (!user) {
    return new AppError("User not found", 404);
  }

  // Prevent admin from deleting themselves
  if (user.clerkId === req.user.clerkId) {
    return new AppError("Cannot delete your own account", 400);
  }

  await User.findOneAndUpdate({ _id: user._id }, { isActive: false });

  res.json({ message: "User deleted successfully" });
});

export const testDBConnection = catchAsync(async (req, res, next) => {
  const testUser = new User({
    clerkId: "test-" + Date.now(),
    email: "test@test.com",
    firstName: "Test",
    lastName: "User",
  });

  await testUser.save();
  console.log("✅ Test user created successfully");

  // Clean up
  await User.deleteOne({ email: "test@test.com" });

  res.json({ success: true, message: "Database working!" });
});

export const initAdmin = catchAsync(async (req, res, next) => {
  // Find all existing users and set ininsico@gmail.com as admin
  const result = await User.updateMany(
    { email: "ininsico@gmail.com" },
    { role: "admin" }
  );

  res.json({
    message: "Admin user initialized",
    modifiedCount: result.modifiedCount,
  });
});

export const createTestUser = catchAsync(async (req, res, next) => {
  const { clerkId, email, firstName, lastName } = req.body;

  if (!clerkId || !email) {
    return new AppError("clerkId and email required", 400);
  }

  const user = new User({
    clerkId,
    email,
    firstName,
    lastName,
    fullName: `${firstName || ""} ${lastName || ""}`.trim(),
    lastLogin: new Date(),
  });

  await user.save();

  console.log(`✅ FORCE CREATED USER: ${user.email}`);
  res.json({ success: true, user });
});

export const getAllUsersForDebugging = catchAsync(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({
    total: users.length,
    users: users.map((u) => ({
      id: u.clerkId,
      email: u.email,
      role: u.role,
      isAdmin: u.role === "admin",
      firstName: u.firstName,
      lastName: u.lastName,
      createdAt: u.createdAt,
      lastLogin: u.lastLogin,
    })),
  });
});

export const checkHealth = catchAsync(async (req, res, next) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});
