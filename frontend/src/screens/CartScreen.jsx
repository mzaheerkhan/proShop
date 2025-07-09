import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';


const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

   const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      <div className="lg:w-2/3">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message >
            Your cart is empty <Link to="/" className="text-red-700 underline">Go Back</Link>
          </Message>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="bg-base-100 rounded-lg p-4 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4">
                  <div className="sm:col-span-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg w-full"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Link to={`/product/${item._id}`} className="text-lg font-medium ">
                      {item.name}
                    </Link>
                  </div>
                  <div className="sm:col-span-1 text-sm font-medium">
                    ${item.price}
                  </div>
                  <div className="sm:col-span-1">
                    <select
                      className="select select-bordered w-full"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-1 text-center">
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="btn  btn-ghost text-red-500"
                    >
                      <FaTrash className='h-5 w-5' />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lg:w-1/3">
        <div className="bg-base-100 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} items)
          </h2>
          <p className="text-lg font-bold mb-4">
            $
            {cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0)
              .toFixed(2)}
          </p>
          <button
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            className="btn btn-primary w-full"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
