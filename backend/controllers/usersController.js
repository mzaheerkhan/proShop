import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import HttpError from "../models/http-error.js";
import generateToken from "../utils/generateToken.js";

//! authuser(login)
const login = asyncHandler(async (req, res,next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.matchPassword(password)) {
   generateToken(res , user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next( new HttpError("Invalid email or password.", 401));
  }
});
//! Register user
const register = asyncHandler(async (req, res,next) => {
  const { name, email, password } = req.body;
  const userExists =await User.findOne({ email });
  if (userExists) {
    return next( new HttpError("User already exists!", 401));
  }
  const user = await User.create({
    name,
    email,
    password
  })
  if(user){
      generateToken(res , user._id)
     res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  else{
    return next(
      new HttpError("Invalid user data." , 401)
    )
  }
});
//! logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out successfully." });
});

//! GetUserProfile
const getUserProfile = asyncHandler(async (req, res,next) => {
  const user = await User.findById(req.user._id)
  if(user){
     res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  else{
    return next(
      new HttpError("User not found.",400)
    )
  }
});

//! UpdateUserProfile
const updateUserProfile = asyncHandler(async (req, res,next ) => {
  const user = await User.findById(req.user._id)
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
     if(req.body.password){
      user.password = req.body.password || user.password
     }
  const updatedUser = await user.save();
  res.status(200).json({
    _id:updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin
  })
  }
  else{
 return next(
  new HttpError("User not found.",400)
 )
  }

});
//! GetUsers
const getUsers = asyncHandler(async (req, res) => {
  res.send(" getUsers ");
});
//!DeleteUsers
const deleteUser = asyncHandler(async (req, res) => {
  res.send(" deleteUser  ");
});
//!GetUserById
const getUserById = asyncHandler(async (req, res) => {
  res.send(" getUserById  ");
});
//!UpdateUser
const updateUser = asyncHandler(async (req, res) => {
  res.send(" updateUser   ");
});

export {
  login,
  register,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
