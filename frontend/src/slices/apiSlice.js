// Imports for RTK Query API setup
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Initialize base query function
const baseQuery = fetchBaseQuery({ baseUrl: '' });

// Define API slice with RTK Query
export const apiSlice = createApi({
  baseQuery, // Configure API base query
  tagTypes: ['User'], // Define tag types for caching and invalidation
  endpoints: (builder) => ({}), // Define API endpoints
});