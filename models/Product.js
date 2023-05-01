import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description for this product."],
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category for this product."],
    maxlength: [30, "Category cannot be more than 30 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price for this product."],
  },
  url: {
    type: String,
    required: [true, "Please provide a url for this product."],
    maxlength: [60, "Url cannot be more than 60 characters"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Please provide an image for this product."],
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
