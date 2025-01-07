import { USERS_URL } from '../constants';
import apiSlice from './api_slice';

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.query({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutQuery, login } = usersApiSlice;
