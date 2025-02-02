//export const BASE_URL =
//    process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '';

export const BASE_URL = '';

const API_BASE_URL = `/api`;

export const PRODUCTS_URL = `${API_BASE_URL}/products`;
export const USERS_URL = `${API_BASE_URL}/users`;
export const ORDERS_URL = `${API_BASE_URL}/orders`;
export const PAYPAL_URL = `${API_BASE_URL}/config/paypal`;

export const PAYMENT_METHODS = {
    paypal: 'PayPal',
    //bitcoin: 'Bit Coin',
};

export const ACCESS_LEVELS = {
    ADMIN: 5,
    MAINTAINER: 2,
    BASIC: 0,
};
