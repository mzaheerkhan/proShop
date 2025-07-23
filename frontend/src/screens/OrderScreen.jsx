import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../redux/slices/orderApiSlice";
import StripeCheckout from "../components/StripeCheckout";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h1 className="text-3xl font-bold mb-6">Order {order._id}</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          {/* Shipping */}
          <div className="card bg-base-100 shadow p-4">
            <h2 className="text-2xl font-semibold  mb-2">Shipping</h2>
            <hr className="mb-1" />
            <p>
              <span className="font-bold">Name:</span> {order.user.name}
            </p>
            <p>
              <span className="font-bold">Email:</span>{" "}
              <span className="">{order.user.email}</span>
              {/* <p>{order.user.email}</p> */}
            </p>
            <p>
              <span className="font-bold">Address:</span>{" "}
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>

          {/* Payment Method */}
          <div className="card bg-base-100 shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <hr className="mb-1" />
            <p>
              <span className="font-bold">Method:</span> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>

          {/* Order Items */}
          <div className="card bg-base-100 shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            <hr className="mb-1" />
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ul className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-600 hover:underline"
                      >
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

        {/* Right Section: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="card bg-base-100 shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Items</span>
                <span>${order.itemsPrice}</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping</span>
                <span>${order.shippingPrice}</span>
              </li>
              <li className="flex justify-between">
                <span>Tax</span>
                <span>${order.taxPrice}</span>
              </li>
              <li className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>${order.totalPrice}</span>
              </li>
            </ul>

            {!order.isPaid && (
              <div className="mt-4">
                <StripeCheckout order={order} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
