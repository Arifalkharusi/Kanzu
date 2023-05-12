import mongoose, { Schema } from "mongoose";

const cartSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: String,
          ref: "Product",
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        length: {
          type: String,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
