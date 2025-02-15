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
        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
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
        profileUpdate: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: ({ pageNumber, pageCount }) => ({
                url: `${USERS_URL}`,
                method: 'GET',
                params: {
                    pageNumber,
                    pageCount,
                },
            }),
            providesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
        getUserInfo: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'GET',
            }),
            providesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutQuery,
    useProfileUpdateMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserInfoQuery,
    useUpdateUserMutation,
} = usersApiSlice;
