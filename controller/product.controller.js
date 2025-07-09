const productModel = require("../model/product.model");
const cloudinary = require("../config/cloudinary");

const newProduct = async (req, res) => {
  try {
    const { productTitle, price, description } = req.body;
    const productCodeGenerator = Math.floor(Math.random() * 1000000000);
    const cloudImage = await cloudinary.uploader.upload(req.file.path);

    const productNew = await productModel.create({
      productTitle,
      price,
      description,
      productImage: cloudImage.secure_url,
      productImageID: cloudImage.public_id,
      productCode: `AutoStores - ${productCodeGenerator}`,
    });

    res
      .status(201)
      .json({ message: "product uploaded successfully", data: productNew });
  } catch (error) {
    res.status(400).json({ message: "failed to create product", data: error });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const getProducts = await productModel.find();

    res
      .status(200)
      .json({ message: "Products gotten successfully", data: getProducts });
  } catch (error) {
    res.status(400).json({ message: "failed to get products", data: error });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const getProduct = await productModel.findById(id); // cleaner than findOne({ _id: id })

    if (!getProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Fetched product successfully",
      data: getProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get product",
      error: error.message,
    });
  }
};

module.exports = { newProduct, getAllProduct, getOneProduct };
