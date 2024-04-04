import { apiSlice } from './apiSlice';
const SESSIONS_URL = '/api/sessions';

export const sessionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    startSession: builder.mutation({
      query: (data) => ({
        url: `${SESSIONS_URL}/start`,
        method: 'PUT',
        body: data,
      }),
    }),
    stopSession: builder.mutation({
        query: (data) => ({
          url: `${SESSIONS_URL}/stop`,
          method: 'PUT',
          body: data,
        }),
      }),
      createSession: builder.mutation({
        query: (data) => ({
          url: `${SESSIONS_URL}/create`,
          method: 'POST',
          body: data,
        }),
      }),
      deleteSession: builder.mutation({
        query: (data) => ({
          url: `${SESSIONS_URL}/delete`,
          method: 'DELETE',
          body: data,
        }),
      }),
      editSession: builder.mutation({
        query: (data) => ({
          url: `${SESSIONS_URL}/edit`,
          method: 'PUT',
          body: data,
        }),
      }),
      getToday: builder.mutation({
        query: (data) => ({
          url: `${SESSIONS_URL}/today`,
          method: 'GET',
          body: data,
        }),
      }),
  }),
});

export const {
  useStartSessionMutation,
  useStopSessionMutation,
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useEditSessionMutation,
  useGetTodayMutation
} = sessionsApiSlice;