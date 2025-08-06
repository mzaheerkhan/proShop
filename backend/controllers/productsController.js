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
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
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
