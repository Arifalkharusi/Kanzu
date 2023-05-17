import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const addProduct = expressAsyncHandler(async (req, res) => {
  const item = await Product.create(req.body);
  res.status(200).json(item);
});

export const findProduct = expressAsyncHandler(async (req, res) => {
  const item = await Product.findById({ _id: req.body.id });

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404);
    throw new Error({ message: "Item not found" });
  }
});

export const getItems = expressAsyncHandler(async (req, res) => {
  const findItems =
    req.params.cat === "new" ? {} : { category: req.params.cat };

  try {
    const item = await Product.find(findItems);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
