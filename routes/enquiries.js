const express = require("express");
const enquiryController = require("../controllers/enquiry");
const authMiddleware = require("../middlewares/auth");

const enquiryRouter = express.Router();

enquiryRouter.get(
  "/",
  authMiddleware.verifyJWT,
  enquiryController.getEnqueries
);
enquiryRouter.post("/", enquiryController.createEnquiry);
enquiryRouter.delete(
  "/single/:enquiryId",
  authMiddleware.verifyJWT,
  enquiryController.deleteEnquiry
);
enquiryRouter.put(
  "/status/:enquiryId",
  authMiddleware.verifyJWT,
  enquiryController.updateEnquiryStatus
);

module.exports = enquiryRouter;
