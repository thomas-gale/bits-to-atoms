import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selected, ParameterType, Parameter } from './types';
import { createExistingIdentity } from '../common/types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    identity: createExistingIdentity('Floorspace', 'floorspace-default'), // Testing
    parameters: [
      {
        identity: createExistingIdentity('X Length', 'xLength'),
        type: ParameterType.NUMBER,
        value: '8'
      },
      {
        identity: createExistingIdentity('Y Length', 'yLength'),
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
