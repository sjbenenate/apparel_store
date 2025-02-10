import { PRODUCTS_URL } from '../constants';
import apiSlice from './api_slice';

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ activeOnly = true }) => ({
                url: `${PRODUCTS_URL}?activeOnly=${activeOnly}`,
                method: 'GET',
            }),
            providesTags: ['Products'],
        }),
        getProductInfo: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: { ...data },
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: { ...data },
            }),
            invalidatesTags: ['Products'],
        }),
        activateProduct: builder.mutation({
            query: ({ productId, active }) => ({
                url: `${PRODUCTS_URL}/${productId}/activate`,
                method: 'PUT',
                body: { active },
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductInfoQuery,
    useCreateProductMutation,
    useActivateProductMutation,
    useUpdateProductMutation,
} = productsApiSlice;
