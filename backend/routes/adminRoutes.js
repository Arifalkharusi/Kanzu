import express, { Router } from "express";
const router = Router();
import {
  addProduct,
  getItems,
  findProduct,
} from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import authAdmin from "../middleware/adminMiddleware.js";

router.post("/add-product", addProduct);
router.post("/find-product", findProduct);
router.get("/get-product/:cat", getItems);

export default router;
