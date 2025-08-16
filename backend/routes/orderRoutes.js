import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder
} from "../controllers/orderController.js";

import { protect,admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Public (none)

// Private routes
router.post("/", protect, addOrderItems);
router.get("/mine", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

// Private + Admin routes
router.get("/", protect, admin, getOrders);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);
router.delete("/:id", protect, admin, deleteOrder) 


export default router;