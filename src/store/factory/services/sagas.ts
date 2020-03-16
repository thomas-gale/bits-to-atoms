import { all } from 'redux-saga/effects';
import { fffPrinterWatchWorkflowUpdatesSaga } from './fffprinter/sagas';
import { humanWorkerWatchWorkflowUpdatesSaga } from './humanworker/sagas';
import { procurementServiceWatchWorkflowUpdatesSaga } from './procurementservice/sagas';
import { dispatchServiceWatchWorkflowUpdatesSaga } from './dispatchservice/sagas';

export function* serviceProvidersWatchWorkflowUpdatesSaga() {
  yield all([
    procurementServiceWatchWorkflowUpdatesSaga(),
    fffPrinterWatchWorkflowUpdatesSaga(),
    humanWorkerWatchWorkflowUpdatesSaga(),
    dispatchServiceWatchWorkflowUpdatesSaga()
  ]);
}
