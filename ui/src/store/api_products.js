import { PRODUCTS_URL } from '../constants';
import apiSlice from './api_slice';

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ activeOnly = true }) => ({
                url: `${PRODUCTS_URL}?activeOnly=${activeOnly}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getProductInfo: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'PUT',
                body: { ...data },
            }),
            invalidatesTags: ['Product'],
        }),
        activateProduct: builder.mutation({
            query: ({ productId, active }) => ({
                url: `${PRODUCTS_URL}/${productId}/activate`,
                method: 'PUT',
                body: { active },
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductInfoQuery,
    useCreateProductMutation,
    useActivateProductMutation,
} = productsApiSlice;
