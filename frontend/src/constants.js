export const BASE_URL =
process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
//export const BASE_URL = ''; // If using proxy
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const PAYMENT_URL = '/api/payment/create-payment-intent';
