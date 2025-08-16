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
    getOrders:builder.query({
      query:()=>({
        url:ORDERS_URL
      }),
      providesTags:['Order']
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
    deliverOrder : builder.mutation({
      query:(id)=>({
       url:`${ORDERS_URL}/${id}/deliver`,
       method:'PUT',
      })
    }),
     deleteOrder:builder.mutation({
      query:(id)=>({
        url:`${ORDERS_URL}/${id}`,
        method:"DELETE",  
      }),
      invalidatesTags:['Order']
    }),
  }),
 
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  usePayOrderMutation,
  useCreatePaymentIntentMutation, 
  useDeliverOrderMutation,
  useDeleteOrderMutation
  
} = orderApiSlice;
