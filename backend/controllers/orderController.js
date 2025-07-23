import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import HttpError from "../models/http-error.js";
//! addOrderItems
const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new HttpError("No order items."));
  }
  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      product: x._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const createOrder = await order.save()
  res.status(201).json(createOrder)
});

//! getOrderById
const getOrderById = asyncHandler(async (req, res, next) => {
 const order = await Order.findById(req.params.id).populate('user','name email')
 if(!order){
    return next(new HttpError("No order found."));
 }
 res.status(200).json(order)
});
//! updateOderToPaid
const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HttpError("No order found."));
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});
//! updateOrderToDelivered
const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  res.send("update order to delivered");
});

//! getMyOrders
const getMyOrders = asyncHandler(async (req, res, next) => {
   const myOrders = await Order.find({ user: req.user._id });
 res.json(myOrders)
});

//! getOrders
const getOrders = asyncHandler(async (req, res, next) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
