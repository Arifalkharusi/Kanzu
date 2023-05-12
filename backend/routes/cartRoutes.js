import express, { Router } from "express";
const router = Router();
import protect from "../middleware/authMiddleware.js";
import {
  addItemToCart,
  deleteFromCart,
  updateCart,
  getCartItems,
} from "../controllers/cartController.js";

router.post("/add-to-cart", protect, addItemToCart);
router.delete("/delete-from-cart", protect, deleteFromCart);
router.put("/update-cart", protect, updateCart);
router.get("/get-cart", protect, getCartItems);

export default router;
