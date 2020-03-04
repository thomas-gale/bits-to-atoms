import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceProvider } from '../factory/services/types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {} as ServiceProvider,
  reducers: {
    setSelected(state, action: PayloadAction<ServiceProvider>) {
      state = action.payload;
    }
    /*setParameter(state, action: PayloadAction<Parameter>) {
      const parameterToSet = state.parameters.find(
        p => p.identity.uuid === action.payload.identity.uuid
      );
      if (parameterToSet) {
        parameterToSet.value = action.payload.value;
      }
    }*/
  }
});

export const { setSelected } = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;
