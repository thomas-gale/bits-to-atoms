import { delay } from 'redux-saga/effects';

export function* economicUpdateSaga() {
  console.log('Starting endless economic update saga.');
  while (true) {
    yield delay(1000);
    console.log('Recompute economics of Factory');
  }
}
