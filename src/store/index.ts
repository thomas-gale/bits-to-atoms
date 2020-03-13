import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import {
  simpleMarketSaga,
  watchRequestAddBuildRequestSaga
} from './market/sagas';

import { reducer as formReducer } from 'redux-form';
import { marketReducer } from './market/slice';
import { factoryReducer } from './factory/slice';
import { selectedReducer } from './selected/slice';
import { factoryTickSaga } from './factory/sagas';

function* rootSaga() {
  yield all([
    simpleMarketSaga(),
    watchRequestAddBuildRequestSaga(),
    factoryTickSaga()
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  market: marketReducer,
  factory: factoryReducer,
  selected: selectedReducer,
  form: formReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware] as const
});

sagaMiddleware.run(rootSaga);

export type RootDispatch = typeof store.dispatch;
