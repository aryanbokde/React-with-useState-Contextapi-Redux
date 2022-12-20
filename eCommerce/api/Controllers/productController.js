const Product = require("../Modules/productModule");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apifeatures");

//Create Product by Admin ----Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

//Get all Product by Admin ----Admin
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
  const products = await apiFeature.query;
  // const products = await Product.find();
  res.status(200).json({ success: true, products });
});

//Update Product by Admin ----Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

//Delete Product by Admin ----Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "Product deleted successfully..!" });
});

//Get Single Product Details
exports.getProductDetail = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});