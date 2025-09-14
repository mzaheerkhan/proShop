import Product from "../models/productModel.js";
import HttpError from "../models/http-error.js";
import dotenv from "dotenv"
dotenv.config()

const baseUrl = process.env.BASE_URL
//! Function to get all products
//! path: /api/products
const getAllProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

//! Function to get a product by ID
//! path: /api/products/:id
const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

//! create new Product
const createProduct = async (req, res, next) => {
  const {name,price,brand,category,countInStock,numReviews,description} = req.body
   const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imagePath = req.file ? `${baseUrl}/uploads/images/${req.file.filename}` : null;
  const product = new Product({
    name,
    price,
    user: req.user._id,
    image: imagePath,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

//! Edit products
const updateProduct = async (req, res, next) => {
  const { name, description, price, brand,countInStock, category,image  } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HttpError("product not found.", 404));
  }
  if (product) {
    product.name = name || product.name,
    product.description = description || product.description,
    product.price = price || product.price,
    product.brand = brand || product.brand,
    product.category = category || product.category,
    product.countInStock = countInStock || product.countInStock;
    if(req.file){
       product.image = `${baseUrl}/${req.file.path.replace(/\\/g, '/')}`;

    }

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  }
};

//! delete products
const deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HttpError("product not found.", 404));
  }
  res.status(200).json({ message: "Product Deleted Successfully." });
};
export { getAllProducts, getProductById, createProduct, deleteProduct,updateProduct };

//! create product review
export const createProductReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new HttpError("product not found.", 404));
  }
  const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
  if (alreadyReviewed) {
    return next(new HttpError("Product already reviewed", 400));
  }
  const review = {
    name: req.user.name,
    rating: Number(rating), 
    comment,
    user: req.user._id
  }
  product.reviews.push(review)
  product.numReviews = product.reviews.length
  product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
  await product.save()
  res.status(201).json({ message: "Review added" })
}