import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTextile } from './factories';
import { User } from './types';

const textileSlice = createSlice({
  name: 'textile',
  initialState: createTextile(),
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = textileSlice.actions;

export const textileReducer = textileSlice.reducer;
