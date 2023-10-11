const Brand = require("../models/brand");
const fs = require("fs");
const path = require("path");

module.exports.createBrand = async (req, res, next) => {
  try {
    const { brandname } = req.body;

    let brandLogoUrl = "";

    req.files.map((file) => {
      brandLogoUrl =
        file.destination.split("/")[1] +
        "/" +
        file.destination.split("/")[2] +
        "/" +
        file.filename;
    });

    const logo = new Brand({
      name: brandname,
      image: brandLogoUrl,
    });

    await logo.save();
    res.send("Brand Created");
  } catch (err) {
    return next(err);
  }
};
module.exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({});
    res.send(brands);
  } catch (err) {
    next(er);
  }
};

module.exports.getSingleBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const brand = await Brand.findById(brandId);
    res.send(brand);
  } catch (err) {
    next(er);
  }
};

module.exports.deleteBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const brand = await Brand.findById(brandId);

    try {
      fs.rmSync(`public/${path.dirname(brand.image)}`, { recursive: true });
    } catch (err) {}
    await Brand.deleteOne({ _id: brand._id });

    res.send("Brand Deleted");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.updateBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;

    const { brandname } = req.body;

    const brand = await Brand.findById(brandId);

    const files = req.files;
    if (files.length > 0) {
      const fileFound = files.find(
        (file) =>
          file.destination + "/" + file.filename == "public/" + brand.image
      );
      if (!fileFound) {
        try {
          fs.rmSync(`public/${brand.image}`, { recursive: true });
        } catch (err) {}
      }
    }

    let brandImageUrl = null;

    if (files.length > 0) {
      brandImageUrl =
        files[0].destination.split("/")[1] +
        "/" +
        files[0].destination.split("/")[2] +
        "/" +
        files[0].filename;
    }

    brand.name = brandname;
    brand.image = brandImageUrl ? brandImageUrl : brand.image;

    await brand.save();

    res.send("Brand Deleted");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
