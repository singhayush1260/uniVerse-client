import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  currentUserId: null,
};

export const authReducer = createReducer(initialState, {
  login: (state, action) => {
    state.isLoggedIn = true;
    state.currentUserId = action.payload.userId;
  },
  logout: (state) => {
    state.isLoggedIn = false;
    state.currentUserId = null;
  },
  setAuthData: (state, action) => {
    console.log("dfdsfs",action)
    state.isLoggedIn = true;
    state.currentUserId = action.payload;
  },
});


