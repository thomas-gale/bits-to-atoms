import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selected, ParameterType, Parameter } from './types';
import { Identity, createExistingIdentity } from '../common/types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    identity: createExistingIdentity('Floorspace', 'id-root-floorspace'),
    parameters: [
      {
        identity: createExistingIdentity('X Length', 'id-test-length-x'),
        type: ParameterType.NUMBER,
        value: '8'
      },
      {
        identity: createExistingIdentity('Y Length', 'id-test-length-y'),
        type: ParameterType.NUMBER,
        value: '4'
      }
    ]
  } as Selected,
  reducers: {
    setParameter(state, action: PayloadAction<Parameter>) {
      const parameterToSet = state.parameters.find(
        p => p.identity.uuid === action.payload.identity.uuid
      );
      if (parameterToSet) {
        parameterToSet.value = action.payload.value;
      }
    }
  }
});

export const { setParameter } = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;
