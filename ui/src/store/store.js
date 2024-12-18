import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api_slice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        middleware: () => [apiSlice.middleware],
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
