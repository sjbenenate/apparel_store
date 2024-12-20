import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cartInfo')
    ? localStorage.getItem('cartInfo')
    : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
});

export const CartSliceReducers = cartSlice.reducer;
