const Contact = require("../models/contact");

module.exports.getContactInfo = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({});

    res.send(contact);
  } catch (err) {
    next(err);
  }
};

module.exports.getAddress = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({});

    res.json({ address: contact.address });
  } catch (err) {
    next(err);
  }
};

module.exports.updateContactInfo = async (req, res, next) => {
  const data = req.body;

  try {
    await Contact.findOneAndUpdate({}, data);

    res.send("Contact information updated");
  } catch (err) {
    next(err);
  }
};
