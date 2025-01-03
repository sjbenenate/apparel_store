import { createSlice, createSelector } from '@reduxjs/toolkit';
import { roundDecimals } from '../utils';

const FREE_SHIPPING = 100;
const TAX_PERCENTAGE = 0.15;

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

    const qtyItems = Object.values(state.cartItems).reduce(
        (acc, item) => acc + item.qty,
        0
    );

    const tax = itemPrices * TAX_PERCENTAGE;
    const shipping = itemPrices >= FREE_SHIPPING ? 0 : 10;

    state.prices = {
        itemPrices: roundDecimals(itemPrices),
        qtyItems,
        tax: roundDecimals(tax),
        taxPercentage: TAX_PERCENTAGE,
        shipping: roundDecimals(shipping),
        total: roundDecimals(itemPrices + tax + shipping),
    };
};

const updateLocalStorage = (state) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
        console.warn(err);
    }
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
                state.cartItems[itemId].qty += Number(item.qty);
            }
            updateTotals(state);
            updateLocalStorage(state);
        },
        setItemQty: (state, action) => {
            state.cartItems[action.payload._id].qty = Number(
                action.payload.qty
            );
            updateTotals(state);
            updateLocalStorage(state);
        },
        removeItem: (state, action) => {
            const itemId = action.payload.itemId;
            delete state.cartItems[itemId];
            state.cartItemIds = state.cartItemIds.filter((id) => id !== itemId);
            updateTotals(state);
            updateLocalStorage(state);
        },
    },
});

// Actions and Reducer exports
export const { addItemToCart, setItemQty, removeItem } = cartSlice.actions;
export default cartSlice;

// Selectors
export const selectCartItemIds = (state) => state.cart.cartItemIds;
export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartPrices = (state) => state.cart.prices;

export const selectCart = (state) => state.cart;

export const createSelectCartItem = (itemId) =>
    createSelector([selectCartItems], (cartItems) =>
        cartItems[itemId]
            ? cartItems[itemId]
            : { message: `no item of this id found: ${itemId}` }
    );
