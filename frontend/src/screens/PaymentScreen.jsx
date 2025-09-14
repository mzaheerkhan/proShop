import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
  <CheckoutSteps step1 step2 step3 />

  <h1 className="text-3xl font-bold mb-6 text-center">Payment Method</h1>

  <form onSubmit={submitHandler} className="space-y-6">
    <div className="form-control gap-2">
      <label className="label">
        <span className="label-text font-lg text-2xl ml-8">Select Method</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="paymentMethod"
          value="stripe"
          checked={paymentMethod === 'stripe'}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="radio "
        />
        <span className="label-text text-base">Card payment</span>
      </label>
    </div>

    <div className="form-control">
      <button type="submit" className="btn btn-primary w-full">
        Continue
      </button>
    </div>
  </form>
</FormContainer>

  );
};

export default PaymentScreen;
