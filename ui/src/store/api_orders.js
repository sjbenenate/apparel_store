import { ORDERS_URL } from '../constants';
import apiSlice from './api_slice';

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...data },
            }),
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
            }),
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderQuery } = ordersApiSlice;
