const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  images: [
    {
      type: String,
      required: true,
    },
  ],
  name: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  diameter: {
    type: String,
    required: true,
  },
  showBrandLogo: {
    type: Boolean,
    default: true,
  },
  location: String,
  pattern: String,
  thread: String,
  type: String,
  loadIndex: Number,
  speedRating: String,
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  category: String,
  discount: Number,
  tradeDepartment: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sold: {
    type: Boolean,
    default: false,
  },
});

ProductSchema.index({ "brand.image": 1, "brand.name": 1 });

module.exports = mongoose.model("Product", ProductSchema);
