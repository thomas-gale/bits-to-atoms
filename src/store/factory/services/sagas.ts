import { all, fork } from 'redux-saga/effects';
import {
  watchRequestFufillmentOfActivitySaga as procurementWatchRequestFufillmentOfActivitySaga,
  watchAcceptFullfillmentOfActivitySaga as procurementWatchAcceptFullfillmentOfActivitySaga,
} from './procurementservice/sagas';
import {
  watchRequestFufillmentOfActivitySaga as humanWorkerWatchRequestFufillmentOfActivitySaga,
  watchAcceptFullfillmentOfActivitySaga as humanWorkerWatchAcceptFullfillmentOfActivitySaga,
} from './humanworker/sagas';
import {
  watchRequestFufillmentOfActivitySaga as fffPrinterWatchRequestFufillmentOfActivitySaga,
  watchAcceptFullfillmentOfActivitySaga as fffPrinterWatchAcceptFullfillmentOfActivitySaga,
} from './fffprinter/sagas';
import {
  watchRequestFufillmentOfActivitySaga as dispatchWatchRequestFufillmentOfActivitySaga,
  watchAcceptFullfillmentOfActivitySaga as dispatchWatchAcceptFullfillmentOfActivitySaga,
} from './dispatchservice/sagas';

export function* serviceProvidersWatchFactoryOpenActivitiesSaga() {
  yield all([
    fork(procurementWatchRequestFufillmentOfActivitySaga),
    fork(humanWorkerWatchRequestFufillmentOfActivitySaga),
    fork(fffPrinterWatchRequestFufillmentOfActivitySaga),
    fork(dispatchWatchRequestFufillmentOfActivitySaga),
  ]);
}

export function* serviceProvidersWatchAcceptFullfillmentOfActivitiesSaga() {
  yield all([
    fork(procurementWatchAcceptFullfillmentOfActivitySaga),
    fork(humanWorkerWatchAcceptFullfillmentOfActivitySaga),
    fork(fffPrinterWatchAcceptFullfillmentOfActivitySaga),
    fork(dispatchWatchAcceptFullfillmentOfActivitySaga),
  ]);
}
