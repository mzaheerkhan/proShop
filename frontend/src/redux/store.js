import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSlice from './slices/authSlice'


export const store = configureStore({
  reducer: { 
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the API slice reducer
    cart: cartSliceReducer, 
    auth:authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the API slice middleware
  devTools: true, // Enable Redux DevTools in development mode
});


