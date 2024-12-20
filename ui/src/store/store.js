import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api_slice';
import { CartSliceReducers } from './cart_slice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: CartSliceReducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
