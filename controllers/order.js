const Order = require("../models/order");

module.exports.createOrder = async (req, res, next) => {
  try {
    const { data } = req.body;
    const order = new Order(data);

    const savedData = await order.save();
    res.send(savedData._id);
  } catch (err) {
    next(err);
  }
};

module.exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});

    res.send(orders);
  } catch (err) {
    next(err);
  }
};

module.exports.getSingleOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("products.productID");

    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);

    res.send("Order Deleted");
  } catch (err) {
    next(err);
  }
};

module.exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const doc = await Order.findById(orderId);

    if (doc.status === "pending") {
      doc.status = "delivered";
    } else {
      doc.status = "pending";
    }

    await doc.save();

    res.send("Order status updated");
  } catch (err) {
    next(err);
  }
};
