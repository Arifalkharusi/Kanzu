import mongoose, { Schema } from "mongoose";
const measurementSchema = new Schema({
  length: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSchema = Schema(
  {
    product: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    measurements: {
      type: [
        {
          length: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
