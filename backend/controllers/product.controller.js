// controllers/product.controller.js
import Product from "../models/product.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    cb(new AppError("Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadProductImage = upload.single("image");

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// @desc    Insert new product
// @route   POST /api/products
// @access  Private (authenticated users only)
export const insertProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, stock, category, status } = req.body;

  // Input validation to prevent SQL/NoSQL injection
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return next(new AppError("Valid product name is required", 400));
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length === 0
  ) {
    return next(new AppError("Valid description is required", 400));
  }

  if (
    price === undefined ||
    typeof price !== "number" ||
    isNaN(price) ||
    price < 0
  ) {
    return next(new AppError("Valid price (>= 0) is required", 400));
  }

  if (
    stock === undefined ||
    typeof stock !== "number" ||
    isNaN(stock) ||
    stock < 0 ||
    !Number.isInteger(stock)
  ) {
    return next(new AppError("Valid stock (integer >= 0) is required", 400));
  }

  if (
    !category ||
    typeof category !== "string" ||
    category.trim().length === 0
  ) {
    return next(new AppError("Valid category is required", 400));
  }

  const validStatuses = ["active", "out of stock"];
  if (status && !validStatuses.includes(status)) {
    return next(
      new AppError("Status must be either 'active' or 'out of stock'", 400)
    );
  }

  // Validate length constraints
  if (name.length > 100) {
    return next(new AppError("Product name cannot exceed 100 characters", 400));
  }

  if (description.length > 500) {
    return next(new AppError("Description cannot exceed 500 characters", 400));
  }

  // Create product using Mongoose (parameterized queries prevent injection)
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
export const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format to prevent NoSQL injection
  if (!isValidObjectId(id)) {
    return next(new AppError("Invalid product ID format", 400));
  }

  // Mongoose parameterized query prevents injection
  const product = await Product.findById(id).select("-__v");

  if (!product) {
    return next(new AppError("Product not found", 404));
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
export const getAllProducts = catchAsync(async (req, res, next) => {
  // Mongoose query - no user input, safe from injection
  const products = await Product.find().select("-__v").sort({ createdAt: -1 });

  // Calculate order totals (optional feature)
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
export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, stock, category, status } = req.body;

  // Validate ObjectId format to prevent NoSQL injection
  if (!isValidObjectId(id)) {
    return next(new AppError("Invalid product ID format", 400));
  }

  // Build update object with validation
  const updateData = {};

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      return next(new AppError("Valid product name is required", 400));
    }
    if (name.length > 100) {
      return next(
        new AppError("Product name cannot exceed 100 characters", 400)
      );
    }
    updateData.name = name.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim().length === 0) {
      return next(new AppError("Valid description is required", 400));
    }
    if (description.length > 500) {
      return next(
        new AppError("Description cannot exceed 500 characters", 400)
      );
    }
    updateData.description = description.trim();
  }

  if (price !== undefined) {
    if (typeof price !== "number" || isNaN(price) || price < 0) {
      return next(new AppError("Valid price (>= 0) is required", 400));
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
      return next(new AppError("Valid stock (integer >= 0) is required", 400));
    }
    updateData.stock = stock;
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim().length === 0) {
      return next(new AppError("Valid category is required", 400));
    }
    updateData.category = category.trim();
  }

  if (status !== undefined) {
    const validStatuses = ["active", "out of stock"];
    if (!validStatuses.includes(status)) {
      return next(
        new AppError("Status must be either 'active' or 'out of stock'", 400)
      );
    }
    updateData.status = status;
  }

  if (req.file) {
    updateData.image = `/productImg/${req.file.filename}`;
  }

  // Check if there's anything to update
  if (Object.keys(updateData).length === 0) {
    return next(new AppError("No valid fields provided for update", 400));
  }

  // Mongoose parameterized update prevents injection
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-__v");

  if (!product) {
    return next(new AppError("Product not found", 404));
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
export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format to prevent NoSQL injection
  if (!isValidObjectId(id)) {
    return next(new AppError("Invalid product ID format", 400));
  }

  // Mongoose parameterized query prevents injection
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new AppError("Product not found", 404));
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

// @desc    Calculate order totals (separate endpoint)
// @route   GET /api/products/totals
// @access  Private (authenticated users only)
export const getOrderTotals = catchAsync(async (req, res, next) => {
  // Mongoose query - no user input, safe from injection
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
