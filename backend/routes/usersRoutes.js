import express from "express";
import {
  login,
  register,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/usersController.js";
import {protect,admin} from "../middlewares/authMiddleware.js"

const router = express.Router();
// public routes

router.post("/login", login);
router.post("/register", register);
router.post("/logout" ,logoutUser)

//private routes
router.get("/profile",protect, getUserProfile);
router.put("/profile",protect,updateUserProfile);
// private and admin routes
router.get("/",protect,admin, getUsers);
router.delete("/:id",protect,admin, deleteUser);
router.get("/:id",protect,admin, getUserById);
router.put("/:id",protect,admin, updateUser);

export default router;
