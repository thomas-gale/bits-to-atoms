import { all } from 'redux-saga/effects';
import { fffPrinterWatchWorkflowUpdatesSaga } from './fffprinter/sagas';
import { humanWorkerWatchWorkflowUpdatesSaga } from './humanworker/sagas';

export function* serviceProvidersWatchWorkflowUpdatesSaga() {
  yield all([
    fffPrinterWatchWorkflowUpdatesSaga(),
    humanWorkerWatchWorkflowUpdatesSaga()
  ]);
}
