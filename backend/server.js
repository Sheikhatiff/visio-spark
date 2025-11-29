import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// Debug middleware - see what the fuck is coming in
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  console.log("📋 Headers:", req.headers);
  console.log("📦 Body:", req.body);
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/clerk-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    fullName: String,
    profileImage: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// ========================================
// PRODUCT SCHEMA & MODEL
// ========================================
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    image: String,
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Stock must be an integer",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: ["electronics", "clothing", "food", "books", "furniture", "other"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["active", "out of stock"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ name: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model("Product", productSchema);

// ========================================
// MULTER SETUP FOR PRODUCT IMAGES
// ========================================
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/productImg");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `product-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only images"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Simple error wrapper for async routes
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ========================================
// PRODUCT CONTROLLER FUNCTIONS
// ========================================

// @desc    Insert new product
// @route   POST /api/products
// @access  Private (authenticated users only)
const insertProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, stock, category, status } = req.body;

  // Input validation to prevent SQL/NoSQL injection
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Valid product name is required" });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    return res.status(400).json({ error: "Valid description is required" });
  }

  if (
    price === undefined ||
    typeof price !== "number" ||
    isNaN(price) ||
    price < 0
  ) {
    return res.status(400).json({ error: "Valid price (>= 0) is required" });
  }

  if (
    stock === undefined ||
    typeof stock !== "number" ||
    isNaN(stock) ||
    stock < 0 ||
    !Number.isInteger(stock)
  ) {
    return res
      .status(400)
      .json({ error: "Valid stock (integer >= 0) is required" });
  }

  if (
    !category ||
    typeof category !== "string" ||
    category.trim().length === 0
  ) {
    return res.status(400).json({ error: "Valid category is required" });
  }

  const validStatuses = ["active", "out of stock"];
  if (status && !validStatuses.includes(status)) {
    return res
      .status(400)
      .json({ error: "Status must be either 'active' or 'out of stock'" });
  }

  // Validate length constraints
  if (name.length > 100) {
    return res
      .status(400)
      .json({ error: "Product name cannot exceed 100 characters" });
  }

  if (description.length > 500) {
    return res
      .status(400)
      .json({ error: "Description cannot exceed 500 characters" });
  }

  // Create product using Mongoose
  const product = await Product.create({
    name: name.trim(),
    description: description.trim(),
    price,
    stock,
    category: category.trim(),
    status: status || "active",
    image: req.file ? `/productImg/${req.file.filename}` : undefined,
  });

  res.status(201).json({
    status: "success",
    message: "Product inserted successfully",
    data: {
      product: {
        id: product._id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        status: product.status,
        createdAt: product.createdAt,
      },
    },
  });
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private (authenticated users only)
const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format to prevent NoSQL injection
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  const product = await Product.findById(id).select("-__v");

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({
    status: "success",
    data: {
      product: {
        id: product._id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        status: product.status,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    },
  });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Private (authenticated users only)
const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().select("-__v").sort({ createdAt: -1 });

  // Calculate order totals
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  res.json({
    status: "success",
    results: products.length,
    data: {
      products: products.map((p) => ({
        id: p._id,
        name: p.name,
        image: p.image,
        description: p.description,
        price: p.price,
        stock: p.stock,
        category: p.category,
        status: p.status,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
      totals: {
        totalProducts: products.length,
        totalStockUnits: totalStock,
        totalInventoryValue: parseFloat(totalValue.toFixed(2)),
      },
    },
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (authenticated users only)
const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, stock, category, status } = req.body;

  // Validate ObjectId format to prevent NoSQL injection
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  // Build update object with validation
  const updateData = {};

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Valid product name is required" });
    }
    if (name.length > 100) {
      return res
        .status(400)
        .json({ error: "Product name cannot exceed 100 characters" });
    }
    updateData.name = name.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim().length === 0) {
      return res.status(400).json({ error: "Valid description is required" });
    }
    if (description.length > 500) {
      return res
        .status(400)
        .json({ error: "Description cannot exceed 500 characters" });
    }
    updateData.description = description.trim();
  }

  if (price !== undefined) {
    if (typeof price !== "number" || isNaN(price) || price < 0) {
      return res.status(400).json({ error: "Valid price (>= 0) is required" });
    }
    updateData.price = price;
  }

  if (stock !== undefined) {
    if (
      typeof stock !== "number" ||
      isNaN(stock) ||
      stock < 0 ||
      !Number.isInteger(stock)
    ) {
      return res
        .status(400)
        .json({ error: "Valid stock (integer >= 0) is required" });
    }
    updateData.stock = stock;
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim().length === 0) {
      return res.status(400).json({ error: "Valid category is required" });
    }
    updateData.category = category.trim();
  }

  if (status !== undefined) {
    const validStatuses = ["active", "out of stock"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ error: "Status must be either 'active' or 'out of stock'" });
    }
    updateData.status = status;
  }

  if (req.file) {
    updateData.image = `/productImg/${req.file.filename}`;
  }

  // Check if there's anything to update
  if (Object.keys(updateData).length === 0) {
    return res
      .status(400)
      .json({ error: "No valid fields provided for update" });
  }

  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-__v");

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({
    status: "success",
    message: "Product updated successfully",
    data: {
      product: {
        id: product._id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        status: product.status,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    },
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (authenticated users only)
const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format to prevent NoSQL injection
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({
    status: "success",
    message: "Product deleted successfully",
    data: {
      deletedProduct: {
        id: product._id,
        name: product.name,
      },
    },
  });
});

// @desc    Calculate order totals
// @route   GET /api/products/totals
// @access  Private (authenticated users only)
const getOrderTotals = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const averagePrice =
    products.length > 0
      ? totalValue / products.reduce((sum, p) => sum + p.stock, 0)
      : 0;

  res.json({
    status: "success",
    data: {
      totals: {
        totalProducts: products.length,
        totalStockUnits: totalStock,
        totalInventoryValue: parseFloat(totalValue.toFixed(2)),
        averageProductPrice: parseFloat(averagePrice.toFixed(2)),
      },
    },
  });
});

// SIMPLE AUTH MIDDLEWARE - FIXED VERSION
const requireAuth = async (req, res, next) => {
  try {
    console.log("🔐 Auth middleware triggered");

    // Get from headers OR body (for sync route)
    const userId = req.headers["user-id"] || req.body.clerkId;
    const userEmail = req.headers["user-email"] || req.body.email;

    console.log("👤 Auth check:", { userId, userEmail });

    if (!userId || !userEmail) {
      console.log("❌ Missing user ID or email");
      return res.status(401).json({ error: "User ID and Email required" });
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
  } catch (error) {
    console.error("❌ Auth error:", error);
    res.status(500).json({ error: "Authentication failed: " + error.message });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// ROUTES

// ========================================
// PRODUCT ROUTES
// ========================================
// Get all products (public)
app.get("/api/products", getAllProducts);

// Get product by ID (public)
app.get("/api/products/:id", getProduct);

// Get product totals (public)
app.get("/api/products/totals", getOrderTotals);

// Create product (admin only) with image upload
app.post(
  "/api/products",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  insertProduct
);

// Update product (admin only) with image upload
app.put(
  "/api/products/:id",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  updateProduct
);

// Delete product (admin only)
app.delete("/api/products/:id", requireAuth, requireAdmin, deleteProduct);

// ========================================
// USER ROUTES
// ========================================

// Sync user data (call this after login) - FIXED VERSION
app.post("/api/users/sync", async (req, res) => {
  try {
    console.log("🔄 Sync route called with body:", req.body);

    const { clerkId, email, firstName, lastName, profileImage } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "clerkId and email required" });
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
  } catch (error) {
    console.error("❌ Sync error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get current user profile
app.get("/api/users/me", requireAuth, async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (Admin only)
app.get("/api/users", requireAuth, requireAdmin, async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
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
  } catch (error) {
    console.log("❌ Database test failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get("/api/users/:id", requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ clerkId: req.params.id }, { _id: req.params.id }],
      isActive: true,
    }).select("-__v");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Users can only see their own profile unless they're admin
    if (req.user.role !== "admin" && user.clerkId !== req.user.clerkId) {
      return res.status(403).json({ error: "Access denied" });
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user role (Admin only)
app.patch(
  "/api/users/:id/role",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
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
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.clerkId,
        email: user.email,
        role: user.role,
        isAdmin: user.role === "admin",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete user (Admin only)
app.delete("/api/users/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ clerkId: req.params.id }, { _id: req.params.id }],
      isActive: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (user.clerkId === req.user.clerkId) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    await User.findOneAndUpdate({ _id: user._id }, { isActive: false });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize admin user (run this once to set ininsico@gmail.com as admin)
app.post("/api/init-admin", async (req, res) => {
  try {
    // Find all existing users and set ininsico@gmail.com as admin
    const result = await User.updateMany(
      { email: "ininsico@gmail.com" },
      { role: "admin" }
    );

    res.json({
      message: "Admin user initialized",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Force create a test user
app.post("/api/force-create-user", async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "clerkId and email required" });
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
  } catch (error) {
    console.error("❌ Force create error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users in database (for debugging)
app.get("/api/debug/users", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/api/health`);
  console.log(`🐛 Debug users: http://localhost:${PORT}/api/debug/users`);
  console.log(`👑 Init admin: http://localhost:${PORT}/api/init-admin`);
  console.log(`🔧 Test DB: http://localhost:${PORT}/api/test-db`);
  console.log(
    `💥 Force create user: http://localhost:${PORT}/api/force-create-user`
  );
});
