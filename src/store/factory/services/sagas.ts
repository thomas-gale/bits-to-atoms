import { all, fork } from 'redux-saga/effects';
import {
  watchRequestFufillmentOfActivitySaga as procurementWatchRequestFufillmentOfActivitySaga,
  watchAcceptFullfillmentOfActivitySaga as procurementWatchAcceptFullfillmentOfActivitySaga
} from './procurementservice/sagas';
import {
  watchRequestFufillmentOfActivitySaga as humanWorkerWatchRequestFufillmentOfActivitySaga,
  watchAcceptFullfillmentOfActivitySaga as humanWorkerWatchAcceptFullfillmentOfActivitySaga
} from './humanworker/sagas';
import { watchRequestFufillmentOfActivitySaga as fffPrinterWatchRequestFufillmentOfActivitySaga } from './fffprinter/sagas';
import { watchRequestFufillmentOfActivitySaga as dispatchServiceWatchRequestFufillmentOfActivitySaga } from './dispatchservice/sagas';

export function* serviceProvidersWatchFactoryOpenActivitiesSaga() {
  yield all([
    fork(procurementWatchRequestFufillmentOfActivitySaga),
    fork(humanWorkerWatchRequestFufillmentOfActivitySaga),
    fork(fffPrinterWatchRequestFufillmentOfActivitySaga),
    fork(dispatchServiceWatchRequestFufillmentOfActivitySaga)
  ]);
}

export function* serviceProvidersWatchAcceptFullfillmentOfActivitiesSaga() {
  yield all([
    fork(procurementWatchAcceptFullfillmentOfActivitySaga),
    fork(humanWorkerWatchAcceptFullfillmentOfActivitySaga)
  ]);
}
