const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  access_token: { type: String },
});

module.exports = mongoose.model("User", ProductSchema);
