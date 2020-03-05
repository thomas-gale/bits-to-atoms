import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceProvider } from '../factory/services/types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {} as ServiceProvider,
  reducers: {
    setSelected(state, action: PayloadAction<ServiceProvider>) {
      console.log(`Set Selected in Slice: ${action.payload.id.displayName}`);
      state = action.payload;
    }
  }
});

export const { setSelected } = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;
