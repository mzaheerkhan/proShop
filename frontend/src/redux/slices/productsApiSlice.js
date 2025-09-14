import { PRODUCTS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, // Keep data for 5 seconds before refetching
      providesTags:['Products']
    }),
    getProductsDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5, // Keep data for 5 seconds before refetching
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query:({productId , formData})=>({
      url: `${PRODUCTS_URL}/${productId}`,
      body:formData,
      method:'PUT'
      }),
      invalidatesTags:['Products']
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createProductReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
} = productsApiSlice;
