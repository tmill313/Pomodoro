import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
    sessionInfo: localStorage.getItem('sessionInfo')
    ? JSON.parse(localStorage.getItem('sessionInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    setSession: (state, action) => {
      state.sessionInfo = action.payload;
      localStorage.setItem('sessionInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.sessionInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('sessionInfo');
    },
  },
});

export const { setCredentials, setSession, logout } = authSlice.actions;

export default authSlice.reducer;
