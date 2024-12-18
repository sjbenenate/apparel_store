import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Product', 'User', 'Order'],
    endpoints: (builder) => ({}),
});

export default apiSlice;
