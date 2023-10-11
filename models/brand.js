const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
