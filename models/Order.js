import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: [true, "Please provide a name for this product."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  address: {
    type: String,
    required: [true, "Please provide a description for this product."],
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  count: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  payment: {
    type: Number,
    required: true,
  },
  products: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

// delete mongoose.connection.models["Order"];
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
