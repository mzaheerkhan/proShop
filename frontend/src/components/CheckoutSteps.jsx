import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <div>
        {step1 ? (
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign In
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Sign In</span>
        )}
      </div>

      <div>
        {step2 ? (
          <Link to="/shipping" className="text-blue-600 hover:underline font-medium">
            Shipping
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Shipping</span>
        )}
      </div>

      <div>
        {step3 ? (
          <Link to="/payment" className="text-blue-600 hover:underline font-medium">
            Payment
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Payment</span>
        )}
      </div>

      <div>
        {step4 ? (
          <Link to="/placeorder" className="text-blue-600 hover:underline font-medium">
            Place Order
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
