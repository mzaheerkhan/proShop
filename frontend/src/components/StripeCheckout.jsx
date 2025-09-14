import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useCreatePaymentIntentMutation, usePayOrderMutation } from '../redux/slices/orderApiSlice';
import { toast } from 'react-toastify';

const StripeCheckout = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [payOrder] = usePayOrderMutation();

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Step 1: Create payment intent with RTK
      const paymentData = await createPaymentIntent(Math.round(order.totalPrice * 100)).unwrap();
      const clientSecret = paymentData.clientSecret;

      // ✅ Step 2: Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: order.user.name,
            email: order.user.email,
          },
        },
      });

      console.log("Stripe result:", result);

      // ✅ Step 3: Update order
      if (result.paymentIntent?.status === 'succeeded') {
        await payOrder({
          orderId: order._id,
          paymentResult: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            update_time: new Date().toISOString(),
            email_address: order.user.email,
          },
        }).unwrap();
        toast.success("Payment successful!");
        window.location.reload(); 
      } else {
        toast.error("Payment failed.");
      }

    } catch (err) {
      console.error("Payment Error:", err);
      alert("Error during payment.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
     <CardElement
  options={{
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#e53e3e",
      },
    },
  }}
  className="w-full p-2 border rounded"
/>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary mt-4"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default StripeCheckout;
