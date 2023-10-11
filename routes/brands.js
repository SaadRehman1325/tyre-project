const express = require("express");
const brandController = require("../controllers/brand");
const fs = require("fs");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth");

const brandRouter = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const currDate = req.body.createdAt;
    req.date = currDate;

    !fs.existsSync(`public/logos/${currDate}`) &&
      fs.mkdirSync(`public/logos/${currDate}`, { recursive: true });
    cb(null, "public/logos/" + currDate);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});

const upload = multer({ storage });

const type = upload.any([{ name: "brandLogo", maxCount: 1 }]);

brandRouter.get("/", brandController.getAllBrands);
brandRouter.get("/single/:brandId", brandController.getSingleBrand);
brandRouter.post(
  "/",
  authMiddleware.verifyJWT,
  type,
  brandController.createBrand
);
brandRouter.delete(
  "/:brandId",
  authMiddleware.verifyJWT,
  brandController.deleteBrand
);
brandRouter.put(
  "/:brandId",
  authMiddleware.verifyJWT,
  type,
  brandController.updateBrand
);

module.exports = brandRouter;
