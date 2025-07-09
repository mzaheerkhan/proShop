import Product from '../models/productModel.js';

//! Function to get all products
//! path: /api/products
const getAllProducts =  async(req,res,next)=>{
    const products = await Product.find({});
    res.status(200).json(products);
}


//! Function to get a product by ID
//! path: /api/products/:id
const getProductById =async(req,res,next)=>{
const productId = req.params.id;
const product = await  Product.findById(productId);
    if(product){
        res.status(200).json(product);
    } else {
        res.status(404).json({message: "Product not found"});
    }
}




export { getAllProducts,getProductById };