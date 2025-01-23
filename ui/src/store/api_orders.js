import { ORDERS_URL, PAYPAL_URL } from '../constants';
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
        getUserOrders: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/myOrders`,
            }),
        }),
        getPayPalClientId: builder.query({
            query: (id) => ({
                url: PAYPAL_URL,
                method: 'GET',
            }),
        }),
        payOrder: builder.mutation({
            query: ({ orderId, data }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'POST',
                body: { ...data, orderId },
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderQuery,
    useGetUserOrdersQuery,
    useGetPayPalClientIdQuery,
    usePayOrderMutation,
} = ordersApiSlice;
