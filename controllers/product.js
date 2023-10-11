const path = require("path");
const Product = require("../models/product");
const fs = require("fs");

module.exports.createProduct = async (req, res, next) => {
  try {
    const {
      height,
      width,
      diameter,
      name,
      price,
      location,
      pattern,
      thread,
      type,
      loadIndex,
      speedRating,
      category,
      discount,
      tradeDepartment,
      description,
      brandId,
      showBrandLogo,
    } = req.body;

    const productImagesUrlArray = [];

    req.files.map((file) => {
      productImagesUrlArray.push(
        file.destination.split("/")[1] +
          "/" +
          file.destination.split("/")[2] +
          "/" +
          file.filename
      );
    });

    const product = new Product({
      height,
      width,
      diameter: diameter.toUpperCase(),
      name,
      price,
      location,
      pattern,
      thread,
      type,
      loadIndex,
      speedRating,
      brand: brandId,
      category,
      discount,
      tradeDepartment,
      description,
      showBrandLogo,
      images: productImagesUrlArray,
    });

    product.save();
    res.send("Product Created");
  } catch (err) {
    return next(err);
    // return res.status(500).send("Something went wrong");
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ sold: false }).populate("brand");
    res.send(products);
  } catch (err) {
    return next(err);
    // return res.status(500).send("Something went wrong");
  }
};

module.exports.getSoldProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ sold: true }).populate("brand");

    res.send(products);
  } catch (err) {
    return next(err);
    // return res.status(500).send("Something went wrong");
  }
};

module.exports.getSingleProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId)
      .select("-__v")
      .populate("brand");

    res.send(product);
  } catch (err) {
    return next(err);
    // return res.status(500).send("Something went wrong");
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    product.images.map((image) => {
      try {
        fs.rmSync(`public/${path.dirname(image)}`, { recursive: true });
      } catch (err) {}
    });
    await Product.deleteOne({ _id: product._id });

    res.send("Product Deleted");
  } catch (err) {
    return next(err);
    // return res.status(500).send("Something went wrong");
  }
};

module.exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const {
      height,
      width,
      diameter,
      name,
      price,
      location,
      pattern,
      thread,
      type,
      loadIndex,
      speedRating,
      category,
      discount,
      tradeDepartment,
      description,
      brandId,
      showBrandLogo,
    } = req.body;

    const product = await Product.findById(productId);

    const files = req.files;

    if (files.length > 0) {
      product.images.map((image) => {
        const fileFound = files.find(
          (file) => file.destination + "/" + file.filename == "public/" + image
        );
        if (!fileFound) {
          try {
            fs.rmSync(`public/${image}`, { recursive: true });
          } catch (err) {}
        }
      });
    }

    const productImagesUrlArray = [];

    files.map((file) => {
      productImagesUrlArray.push(
        file.destination.split("/")[1] +
          "/" +
          file.destination.split("/")[2] +
          "/" +
          file.filename
      );
    });

    product.height = height;
    product.width = width;
    product.diameter = diameter;
    product.name = name;
    product.price = price;
    product.location = location;
    product.pattern = pattern;
    product.thread = thread;
    product.type = type;
    product.loadIndex = loadIndex;
    product.speedRating = speedRating;
    product.brand = brandId;
    product.category = category;
    product.discount = discount;
    product.tradeDepartment = tradeDepartment;
    product.description = description;
    product.showBrandLogo = showBrandLogo;
    product.images = files.length > 0 ? productImagesUrlArray : product.images;

    await product.save();

    res.send("Product Updated");
  } catch (err) {
    return next(err);
    // return res.status(500).send("Something went wrong");
  }
};

module.exports.filterProductsSearch = async (req, res, next) => {
  try {
    const query = {
      ...req.query,
      sold: false,
    };
    const products = await Product.find(query).populate("brand");
    res.send(products);
  } catch (err) {
    return next(err);
    // return res.status(500).send("Something went wrong");
  }
};

module.exports.getAllBrands = async (req, res, next) => {
  try {
    // const brands = await Product.aggregate([
    //   {
    //     $group: {
    //       _id: { image: "$brand.image", name: "$brand.name" },
    //       brand: { $first: "$brand" },
    //     },
    //   },
    //   {
    //     $replaceRoot: { newRoot: "$brand" },
    //   },
    // ]);
    const brands = await Product.find({}, { brand: 1 })
      .sort({ "brand.name": 1 })
      .collation({ locale: "en", strength: 1 })
      .distinct("brand");

    res.send(brands);
  } catch (err) {
    return next(err);
    // return res.status(500).send("Something went wrong");
  }
};

module.exports.getProductsDimensions = async (req, res, next) => {
  try {
    const {
      width = undefined,
      height = undefined,
      diameter = undefined,
    } = req.query;

    const match = {};

    match.sold = false;

    if (width !== undefined) {
      // match.width = parseInt(width);
      match.width = { $regex: width, $options: "i" };
      // match.$expr = {
      //   $regexMatch: {
      //     input: { $toString: "$width" },
      //     regex: width,
      //     options: "i",
      //   },
      // };
    }

    if (height !== undefined) {
      // match.height = parseInt(height);
      match.height = { $regex: height, $options: "i" };
    }
    if (diameter !== undefined) {
      // match.diameter = diameter;
      match.diameter = { $regex: diameter, $options: "i" };
    }

    const products = await Product.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: { width: "$width", height: "$height", diameter: "$diameter" },
        },
      },
      {
        $project: {
          _id: 0,
          width: "$_id.width",
          height: "$_id.height",
          diameter: "$_id.diameter",
        },
      },
    ]);

    res.send(products);
  } catch (err) {
    next(err);
  }
};
