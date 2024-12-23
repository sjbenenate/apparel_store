import { createSlice, createSelector } from '@reduxjs/toolkit';
import { roundDecimals } from '../utils';

const FREE_SHIPPING = 100;

const STORAGE_KEY = 'cart';

const initialState = localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : { cartItems: {}, cartItemIds: [], prices: {} };

// Edge case handling when localstorage was saved with older version of app
if (!initialState.cartItemIds) {
    initialState.cartItemIds = [];
}

if (!initialState.prices) {
    initialState.prices = {};
}

if (!initialState.cartItems) {
    initialState.cartItems = {};
}

// reducer helpers
const updateTotals = (state) => {
    const itemPrices = Object.values(state.cartItems).reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    const tax = itemPrices * 0.15;
    const shipping = itemPrices >= FREE_SHIPPING ? 0 : 10;

    state.prices = {
        itemPrices: roundDecimals(itemPrices),
        tax: roundDecimals(tax),
        shipping: roundDecimals(shipping),
        total: roundDecimals(itemPrices + tax + shipping),
    };
};

// The Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload;
            const itemId = action.payload._id;
            const itemExists = state.cartItems[itemId];

            if (!itemExists) {
                state.cartItems = { ...state.cartItems, [itemId]: item };
                state.cartItemIds = [...state.cartItemIds, itemId];
            } else {
                state.cartItems[itemId].qty += item.qty;
            }
            updateTotals(state, itemId);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (err) {
                console.warn(err);
            }
        },
    },
});

// Actions and Reducer exports
export const { addItemToCart } = cartSlice.actions;
export const CartSliceReducers = cartSlice.reducer;

// Selectors
export const selectCartItemIds = (state) => state.cart.cartItemIds;

export const selectCartPrices = (state) => state.cart.prices;

export const selectCartQty = (state) => {
    return state.cart.cartItemIds.reduce(
        (acc, id) => acc + state.cart.cartItems[id]?.qty,
        0
    );
};
export const selectCart = (state) => state.cart;

export const createSelectCartItem = (itemId) =>
    createSelector([selectCart], (cart) =>
        cart.cartItems[itemId] ? cart.cartItems[itemId] : {}
    );
