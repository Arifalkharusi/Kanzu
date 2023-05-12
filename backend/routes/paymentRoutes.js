import express, { Router } from "express";
const router = Router();
import { makePayment } from "../controllers/paymentController.js";

router.post("/payment", makePayment);

export default router;
