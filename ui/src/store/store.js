import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api_slice';
import cartSlice from './cart_slice';
import authSlice from './auth_slice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSlice.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
