const express = require("express");
const router = express.Router();

const {
  getAllProduct,
  newProduct,
  getOneProduct,
} = require("../controller/product.controller");
const { upload } = require("../config/multer");

router.route("/newproduct").post(upload, newProduct);
router.route("/getallproducts").get(getAllProduct);
router.route("/my-product/:id").get(getOneProduct);

module.exports = router;
