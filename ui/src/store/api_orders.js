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
            query: () => ({
                url: `${ORDERS_URL}/myOrders`,
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
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
        getAllOrders: builder.query({
            query: ({ pageNumber, pageCount }) => ({
                url: ORDERS_URL,
                method: 'GET',
                params: {
                    pageNumber,
                    pageCount,
                },
            }),
        }),
        markAsDelivered: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}/deliver`,
                method: 'PUT',
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
    useGetAllOrdersQuery,
    useMarkAsDeliveredQuery,
} = ordersApiSlice;
