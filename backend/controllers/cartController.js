import Cart from "../models/cartModel.js";
import expressAsyncHandler from "express-async-handler";

export const addItemToCart = expressAsyncHandler(async (req, res) => {
  const { product, quantity, price, size, length, img } = req.body;

  try {
    const userCart = await Cart.findOne({ user: req.user._id });

    if (userCart) {
      const productIncluded = userCart.cartItems.find(
        (x) => x.product == product
      );

      if (productIncluded) {
        console.log(productIncluded);
        const test = await Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItems.product": product,
          },
          {
            $set: {
              "cartItems.$.quantity": productIncluded.quantity + +quantity,
            },
          }
        );
        console.log(test);
        res.status(201).json("updated quantity");
      } else {
        await Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: {
                product,
                quantity,
                price,
                size,
                length,
                img,
              },
            },
          }
        );
        res.status(201).json("new product");
      }
    } else {
      await Cart.create({
        user: req.user._id,
        cartItems: [{ product, quantity, price, size, length, img }],
      });

      res.status(201).json("first time cart");
    }
  } catch (err) {
    res.status(400);
    console.log(err);
    throw new Error("please ensure u add all fields");
  }
});

export const deleteFromCart = expressAsyncHandler(async (req, res) => {
  const { product } = req.body;

  try {
    const userCart = await Cart.findOne({ user: req.user._id });

    if (userCart) {
      await Cart.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { cartItems: { product } } }
      );

      res.status(200).json("Cart item deleted successfully");
    } else {
      res.status(404).json("Cart not found");
    }
  } catch (err) {
    res.status(400).json("Failed to delete cart item");
  }
});

export const updateCart = expressAsyncHandler(async (req, res) => {
  const { quantity, product } = req.body;

  try {
    const userCart = await Cart.findOne({ user: req.user._id });
    const productIncluded = userCart.cartItems.find(
      (x) => x.product == product
    );
    if (userCart) {
      await Cart.findOneAndUpdate(
        { user: req.user._id, "cartItems.product": product },
        {
          $set: {
            "cartItems.$.quantity": productIncluded.quantity + +quantity,
          },
        }
      );

      res.status(200).json("Cart item quantity updated successfully");
    } else {
      res.status(404).json("Cart not found");
    }
  } catch (err) {
    res.status(400).json("Failed to update cart item quantity");
  }
});

export const getCartItems = expressAsyncHandler(async (req, res) => {
  try {
    const userCart = await Cart.findOne({ user: req.user._id });

    if (userCart) {
      const cartItems = userCart.cartItems;
      res.status(200).json(cartItems);
    } else {
      res.status(404).json([]);
    }
  } catch (err) {
    res.status(400).json("Failed to get cart items");
  }
});
