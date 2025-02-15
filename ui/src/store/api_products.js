import { PRODUCTS_URL, UPLOADS_URL } from '../constants';
import apiSlice from './api_slice';

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({
                activeOnly = true,
                pageNumber,
                pageCount,
                searchKeyword,
            }) => ({
                url: `${PRODUCTS_URL}`,
                params: {
                    activeOnly,
                    pageNumber,
                    pageCount,
                    searchKeyword,
                },
                method: 'GET',
            }),
            providesTags: ['Products'],
        }),
        getProductInfo: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
            providesTags: ['Products'],
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
        deleteProduct: builder.mutation({
            query: ({ productId }) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
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
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}/products/image`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        addReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data?.productId}/review`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductInfoQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useActivateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useAddReviewMutation,
} = productsApiSlice;
