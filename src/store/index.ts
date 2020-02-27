import { configureStore } from '@reduxjs/toolkit';
import { rootReducer} from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
  })
