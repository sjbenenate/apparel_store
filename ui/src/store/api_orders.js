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
        createPayTransaction: builder.mutation({
            query: ({ orderId, data }) => ({
                url: `${ORDERS_URL}/${orderId}/payInitiate`,
                method: 'POST',
                body: { ...data, orderId },
            }),
        }),
        capturePayTransaction: builder.mutation({
            query: ({ orderId, paymentId }) => ({
                url: `${ORDERS_URL}/${orderId}/payCapture`,
                method: 'POST',
                body: { orderId, paymentId },
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderQuery,
    useGetUserOrdersQuery,
    useGetPayPalClientIdQuery,
    useCreatePayTransactionMutation,
    useCapturePayTransactionMutation,
} = ordersApiSlice;
