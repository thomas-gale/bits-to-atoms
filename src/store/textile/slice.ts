import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTextile } from './factories';
import { User } from './types';

const textileSlice = createSlice({
  name: 'textile',
  initialState: createTextile(),
  reducers: {
    showUserDetails(state, _: PayloadAction) {
      state.detailsVisible = true;
    },
    hideUserDetails(state, _: PayloadAction) {
      state.detailsVisible = false;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const {
  showUserDetails,
  hideUserDetails,
  setUser,
  setToken,
} = textileSlice.actions;

export const textileReducer = textileSlice.reducer;
