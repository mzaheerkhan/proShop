import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../redux/slices/cartSlice' 
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };
  return (
     <FormContainer>
        <CheckoutSteps step1 step2  />
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <div className="form-control">
          <label htmlFor="address" className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            className="input input-bordered w-full"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="city" className="label">
            <span className="label-text">City</span>
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter city"
            className="input input-bordered w-full"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="postalCode" className="label">
            <span className="label-text">Postal Code</span>
          </label>
          <input
            id="postalCode"
            type="text"
            placeholder="Enter postal code"
            className="input input-bordered w-full"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="country" className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            id="country"
            type="text"
            placeholder="Enter country"
            className="input input-bordered w-full"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Continue
          </button>
        </div>
      </form>
    </FormContainer>
  )
}

export default ShippingScreen
