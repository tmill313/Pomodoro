import { createSlice } from '@reduxjs/toolkit';

// Define the initial state, pulling from localStorage if available.
const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  sessionInfo: localStorage.getItem('sessionInfo') ? JSON.parse(localStorage.getItem('sessionInfo')) : null,
};

// Create a slice for authentication with initial state and reducers.
const authSlice = createSlice({
  name: 'auth', // Slice name
  initialState, // Slice initial state
  reducers: {
    // Action to set user credentials and save them to localStorage.
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // Action to set session info and save it to localStorage.
    setSession: (state, action) => {
      state.sessionInfo = action.payload;
      localStorage.setItem('sessionInfo', JSON.stringify(action.payload));
    },
    // Action to clear user and session info from state and localStorage.
    logout: (state, action) => {
      state.userInfo = null;
      state.sessionInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('sessionInfo');
    },
  },
});

// Export the actions for use elsewhere.
export const { setCredentials, setSession, logout } = authSlice.actions;

// Export the reducer for the store configuration.
export default authSlice.reducer;
