import { createSlice } from '@reduxjs/toolkit';

const FREE_SHIPPING = 100;

const STORAGE_KEY = 'cartItems';

const initialState = localStorage.getItem(STORAGE_KEY)
    ? { cartItems: JSON.parse(localStorage.getItem(STORAGE_KEY)) }
    : { cartItems: [] };

const roundDecimals = (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
};

const updateTotals = (state) => {
    state.itemsPrice = roundDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    state.taxPrice = roundDecimals(state.itemsPrice * 0.15);
    state.shippingPrice = roundDecimals(
        state.itemsPrice >= FREE_SHIPPING ? 0 : 10
    );
    state.totalPrice = roundDecimals(
        Number(state.itemsPrice) +
            Number(state.taxPrice) +
            Number(state.shippingPrice)
    );
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
            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(state.cartItems)
                );
            } catch (err) {
                console.warn(err);
            }
        },
    },
});

export const { addItemToCart } = cartSlice.actions;
export const CartSliceReducers = cartSlice.reducer;
