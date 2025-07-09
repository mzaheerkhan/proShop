import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps'
import { useCreateOrderMutation } from '../redux/slices/orderApiSlice'
import { clearCartItems } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderScreen = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart)
  const [createOrder , {isLoading,error} ] = useCreateOrderMutation()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
 
 const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };



  return (
    <>
  <CheckoutSteps step1 step2 step3 step4 />

  <div className="flex flex-col lg:flex-row gap-6 mt-6">
    {/* Left Section */}
    <div className="flex-1">
      <div className="space-y-4">
        {/* Shipping Info */}
        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p>
            <span className="font-semibold">Address:</span>{' '}
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
        </div>

        {/* Payment Method */}
        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-xl font-bold mb-2">Payment Method</h2>
          <p>
            <span className="font-semibold">Method:</span> {cart.paymentMethod}
          </p>
        </div>

        {/* Order Items */}
        <div className="card bg-base-100 shadow p-4">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <Message variant="danger">Your cart is empty</Message>
          ) : (
            <ul className="space-y-4">
              {cart.cartItems.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${item._id}`} className="text-blue-600 hover:underline">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-sm font-medium">
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>

    {/* Right Section: Order Summary */}
    <div className="w-full lg:w-1/3">
      <div className="card bg-base-100 shadow p-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Items</span>
            <span>${cart.itemsPrice}</span>
          </li>
          <li className="flex justify-between">
            <span>Shipping</span>
            <span>${cart.shippingPrice}</span>
          </li>
          <li className="flex justify-between">
            <span>Tax</span>
            <span>${cart.taxPrice}</span>
          </li>
          <li className="flex justify-between font-bold border-t pt-2">
            <span>Total</span>
            <span>${cart.totalPrice}</span>
          </li>
        </ul>

      {error && <Message variant="danger">{error}</Message>}

        <button
          type="button"
          className="btn btn-primary mt-4 w-full"
          disabled={cart.cartItems.length === 0}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
        

        {isLoading && <Loader />}
      </div>
    </div>
  </div>
</>

  )
}

export default OrderScreen
