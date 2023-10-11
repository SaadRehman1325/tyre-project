const mongoose = require("mongoose");
const orderModel = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  postal_code: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  products: {
    type: [
      {
        productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
  },
  date: { type: Date, default: Date.now },
  email: { type: String, required: true },
  total: { type: String, required: true },
  status: { type: String, default: "pending" },
  paymentMethod: { type: String, required: true },
});

orderModel.pre("save", async function (next) {
  const order = this;
  try {
    // Extract the product IDs from the order's products array
    const productIDs = order.products.map((product) => product.productID);

    // Fetch all the products referenced in the order
    const products = await mongoose
      .model("Product")
      .find({ _id: { $in: productIDs } });

    // Update the status of each product
    const updatePromises = products.map((product) => {
      product.sold = true;
      return product.save();
    });

    await Promise.all(updatePromises);
  } catch (error) {
    return next(error);
  }
  next();
});

const Order = mongoose.model("order", orderModel);
module.exports = Order;
