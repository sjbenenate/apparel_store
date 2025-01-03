import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'userAuth';

const initialState = localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : { userInfo: {} };

const updateLocalStorage = (state) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
        console.warn(err);
    }
};

// The Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            updateLocalStorage(state);
        },
    },
});

// Actions and Reducer exports
export const { login } = authSlice.actions;
export default authSlice;

// Selectors
export const selectAuthInfo = (state) => state.auth.authInfo;
