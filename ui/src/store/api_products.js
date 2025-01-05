import { PRODUCTS_URL } from '../constants';
import apiSlice from './api_slice';

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
        }),
        getProductInfo: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductInfoQuery } = productsApiSlice;
