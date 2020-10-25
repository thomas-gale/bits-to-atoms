import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client, Identity, ThreadID } from '@textile/hub';
import { createTextile } from './factories';
import { Collection } from './types';

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
    setIdentity(state, action: PayloadAction<Identity>) {
      state.identity = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setClient(state, action: PayloadAction<Client>) {
      state.client = action.payload;
    },
    setThread(state, action: PayloadAction<ThreadID>) {
      state.thread = action.payload;
    },
    setCollections(state, action: PayloadAction<Collection[]>) {
      state.collections = action.payload;
    },
  },
});

export const {
  showUserDetails,
  hideUserDetails,
  setIdentity,
  setToken,
  setClient,
  setThread,
  setCollections,
} = textileSlice.actions;

export const textileReducer = textileSlice.reducer;
