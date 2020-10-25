import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import {
  experimentalTextileSaga,
  generateIdentitySaga,
} from './textile/user-identity-sagas';

import {
  simpleMarketSaga,
  watchRequestAddBuildRequestSaga,
} from './market/sagas';

import { reducer as formReducer } from 'redux-form';
import { textileReducer } from './textile/slice';
import { marketReducer } from './market/slice';
import { factoryReducer } from './factory/slice';
import { selectedReducer } from './selected/slice';
import {
  factoryUpdateTickSaga,
  factoryWatchAddActiveBuildRequestSaga,
} from './factory/sagas';
import {
  serviceProvidersWatchFactoryOpenActivitiesSaga,
  serviceProvidersWatchAcceptFullfillmentOfActivitiesSaga,
} from './factory/services/sagas';
import { informationReducer } from './information/slice';

function* rootSaga() {
  yield all([
    fork(experimentalTextileSaga),
    fork(simpleMarketSaga),
    fork(watchRequestAddBuildRequestSaga),
    fork(factoryUpdateTickSaga),
    fork(factoryWatchAddActiveBuildRequestSaga),
    fork(serviceProvidersWatchFactoryOpenActivitiesSaga),
    fork(serviceProvidersWatchAcceptFullfillmentOfActivitiesSaga),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  textile: textileReducer,
  market: marketReducer,
  factory: factoryReducer,
  selected: selectedReducer,
  information: informationReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware] as const,
});

sagaMiddleware.run(rootSaga);

export type RootDispatch = typeof store.dispatch;
