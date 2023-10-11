const mongoose = require("mongoose");
const enquiryModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Enquiry", enquiryModel);
module.exports = Contact;
