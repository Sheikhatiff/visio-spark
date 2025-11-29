// routes/product.routes.js
import express from "express";
import {
  insertProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getOrderTotals,
} from "../controllers/product.controller.js";
import { protect, requireAdmin } from "../controllers/auth.controller.js";

const productRouter = express.Router();

// All product routes require authentication (only authenticated users can access)
productRouter.use(protect);

// CRUD Operations on Products table
productRouter.get("/", getAllProducts); // GetAllProducts() - includes order totals
productRouter.get("/:id", getProduct); // GetProduct(id)
productRouter.delete("/:id", deleteProduct); // DeleteProduct(id)
productRouter.get("/totals", getOrderTotals);

productRouter.use(requireAdmin); // Only admin users can create, update, or delete products
productRouter.post("/", uploadProductImage, insertProduct); // InsertProduct(name, description, price, stock, category, status) + image upload
productRouter.put("/:id", uploadProductImage, updateProduct); // UpdateProduct(id, name, description, price, stock, category, status) + image upload

export default productRouter;
