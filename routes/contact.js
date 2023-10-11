const express = require("express");
const contactController = require("../controllers/contact");
const authMiddleware = require("../middlewares/auth");

const contactRouter = express.Router();

contactRouter.get("/", contactController.getContactInfo);
contactRouter.get("/address", contactController.getAddress);
contactRouter.put("/", contactController.updateContactInfo);

module.exports = contactRouter;
