import { delay } from 'redux-saga/effects';

/**
 *  Starts up Gundb
 */
export function* gunLoadSaga() {
  console.log('Starting loading GunDb');

  yield delay(100);

  console.log('Completed loading GunDb');
}
