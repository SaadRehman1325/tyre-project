const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  emailAddress: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  facebookLink: { type: String },
  youtubeLink: { type: String },
  instagramLink: { type: String },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
