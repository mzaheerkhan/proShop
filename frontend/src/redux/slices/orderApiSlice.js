import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYMENT_URL } from "../../constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: paymentResult,
        credentials: "include",
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: `${PAYMENT_URL}`,
        method: "POST",
        body: { amount },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  usePayOrderMutation,
  useCreatePaymentIntentMutation, // ✅ export this
} = orderApiSlice;
