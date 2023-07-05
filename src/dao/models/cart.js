import mongoose from "mongoose";

const collectionCarts = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          ref:"productos",
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
    default: [],
  },
});

const cartModel = mongoose.model(collectionCarts, cartSchema);

export default cartModel;
