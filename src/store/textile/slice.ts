import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { BuildRequest } from '../buildrequest/types';
import { Parameter } from '../common/parameter/types';
import { Activity, Workflow } from '../workflow/types';
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
