import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import fileUpload from "../middlewares/fileUpload.js"
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  createProductReview
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin,fileUpload.single('image'), createProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", protect, admin,fileUpload.single('image'), updateProduct);
router.post("/:id/reviews", protect, createProductReview);

export default router;
