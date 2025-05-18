import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // We'll update this later
  tagTypes: ['Hotel', 'Room', 'Booking', 'User', 'Review'],
  endpoints: (builder) => ({}),
});