const express = require("express");
const orderController = require("../controllers/order");
const authMiddleware = require("../middlewares/auth");
const orderRouter = express.Router();

orderRouter.get("/", authMiddleware.verifyJWT, orderController.getOrders);
orderRouter.get(
  "/single/:orderId",
  authMiddleware.verifyJWT,
  orderController.getSingleOrder
);
orderRouter.post("/", orderController.createOrder);
orderRouter.delete(
  "/single/:orderId",
  authMiddleware.verifyJWT,
  orderController.deleteOrder
);
orderRouter.put(
  "/status/:orderId",
  authMiddleware.verifyJWT,
  orderController.updateOrderStatus
);
module.exports = orderRouter;
