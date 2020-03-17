import { all } from 'redux-saga/effects';
import { fffPrinterWatchOpenActivitiesSaga } from './fffprinter/sagas';
import { humanWorkerWatchOpenActivitiesSaga } from './humanworker/sagas';
import { procurementServiceWatchOpenActivitiesSaga } from './procurementservice/sagas';
import { dispatchServiceWatchOpenActivitiesSaga } from './dispatchservice/sagas';

export function* serviceProvidersWatchFactoryOpenActivitiesSaga() {
  yield all([
    procurementServiceWatchOpenActivitiesSaga(),
    fffPrinterWatchOpenActivitiesSaga(),
    humanWorkerWatchOpenActivitiesSaga(),
    dispatchServiceWatchOpenActivitiesSaga()
  ]);
}
