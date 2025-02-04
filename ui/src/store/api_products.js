import { PRODUCTS_URL } from '../constants';
import apiSlice from './api_slice';

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (active = true) => ({
                url: `${PRODUCTS_URL}?active=${active}`,
                method: 'GET',
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
