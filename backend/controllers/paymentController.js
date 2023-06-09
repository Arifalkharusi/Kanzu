import * as dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Product from "../models/productModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const makePayment = asyncHandler(async (req, res) => {
  const { items } = req.body;

  try {
    const lineItems = await Promise.all(
      items.map(async (x) => {
        const product = await Product.findById(x.id);
        if (!product) {
          throw new Error(`Product with ID ${x.id} not found.`);
        }
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: product.product,
              description: `Size ${x.length}`,
              images: [product.image[0]],
            },
            unit_amount: product.price * 100,
          },
          quantity: x.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "gbp",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "gbp",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "GB"],
      },
      mode: "payment",
      success_url: "https://kanzu.netlify.app/",
      cancel_url: "https://kanzu.netlify.app/",
    });

    res.status(200).json({ paymentUrl: session.url });
  } catch (err) {
    res.status(406);
    throw new Error(err.message);
  }
});
