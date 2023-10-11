const Enquiry = require("../models/enquiry");

module.exports.createEnquiry = async (req, res, next) => {
  try {
    const { data } = req.body;

    const enquiry = new Enquiry(data);

    await enquiry.save();

    res.send("Enquiry created");
  } catch (err) {
    next(err);
  }
};
module.exports.getEnqueries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({});

    res.send(enquiries);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteEnquiry = async (req, res, next) => {
  try {
    const { enquiryId } = req.params;
    const enquiries = await Enquiry.findByIdAndDelete(enquiryId);

    res.send(enquiries);
  } catch (err) {
    next(err);
  }
};

module.exports.updateEnquiryStatus = async (req, res, next) => {
  try {
    const { enquiryId } = req.params;
    const doc = await Enquiry.findById(enquiryId);

    if (doc.status === "pending") {
      doc.status = "seen";
    } else {
      doc.status = "pending";
    }

    await doc.save();

    res.send("Enquiry status updated");
  } catch (err) {
    next(err);
  }
};
