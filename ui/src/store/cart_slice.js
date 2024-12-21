import { createSlice } from '@reduxjs/toolkit';

const FREE_SHIPPING = 100;

const initialState = localStorage.getItem('cartInfo')
    ? localStorage.getItem('cartInfo')
    : { cartItems: [] };

const updateTotals = (state) => {
    state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    state.taxPrice = state.itemsPrice * 0.15;
    state.shippingPrice = state.itemsPrice >= FREE_SHIPPING ? 0 : 10;
    state.totalPrice = state.itemsPrice + state.taxPrice + state.shippingPrice;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload;
            const itemExists = state.cartItems.some((i) => i._id === item._id);
            if (!itemExists) {
                state.cartItems = [...state.cartItems, item];
            } else {
                state.cartItems = state.cartItems.map((i) =>
                    i._id === item._id ? { ...item, qty: i.qty + item.qty } : i
                );
            }
            updateTotals(state);
        },
    },
});

export const { addItemToCart } = cartSlice.actions;
export const CartSliceReducers = cartSlice.reducer;
