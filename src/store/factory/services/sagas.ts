import { all } from 'redux-saga/effects';
import { watchRequestFufillmentOfActivitySaga as procurementWatchRequestFufillmentOfActivitySaga } from './procurementservice/sagas';
import { watchRequestFufillmentOfActivitySaga as humanWorkerWatchRequestFufillmentOfActivitySaga } from './humanworker/sagas';
import { watchRequestFufillmentOfActivitySaga as fffPrinterWatchRequestFufillmentOfActivitySaga } from './fffprinter/sagas';
import { watchRequestFufillmentOfActivitySaga as dispatchServiceWatchRequestFufillmentOfActivitySaga } from './dispatchservice/sagas';

export function* serviceProvidersWatchFactoryOpenActivitiesSaga() {
  yield all([
    procurementWatchRequestFufillmentOfActivitySaga(),
    humanWorkerWatchRequestFufillmentOfActivitySaga(),
    fffPrinterWatchRequestFufillmentOfActivitySaga(),
    dispatchServiceWatchRequestFufillmentOfActivitySaga()
  ]);
}
