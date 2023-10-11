const express = require("express");
const productController = require("../controllers/product");
const fs = require("fs");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const currDate = req.body.createdAt;
    req.date = currDate;

    !fs.existsSync(`public/images/${currDate}`) &&
      fs.mkdirSync(`public/images/${currDate}`, { recursive: true });
    cb(null, "public/images/" + currDate);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});

const upload = multer({ storage });

const type = upload.any([{ name: "productImages", maxCount: 10 }]);

const productRouter = express.Router();

productRouter.post(
  "/create",
  authMiddleware.verifyJWT,
  type,
  productController.createProduct
);
productRouter.get("/all", productController.getAllProducts);
productRouter.get(
  "/sold",
  authMiddleware.verifyJWT,
  productController.getSoldProducts
);
productRouter.get(
  "/brands/all",
  authMiddleware.verifyJWT,
  productController.getAllBrands
);
productRouter.get("/single/:productId", productController.getSingleProduct);
productRouter.get(
  "/filter-products-search",
  productController.filterProductsSearch
);
productRouter.delete(
  "/:productId",
  authMiddleware.verifyJWT,
  productController.deleteProduct
);
productRouter.put(
  "/:productId",
  authMiddleware.verifyJWT,
  type,
  productController.updateProduct
);
productRouter.get(
  "/products-dimensions",
  productController.getProductsDimensions
);
module.exports = productRouter;
