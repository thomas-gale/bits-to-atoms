import { delay } from 'redux-saga/effects';

export function* factoryTickSaga() {
  console.log('Starting endless factory tick saga.');
  while (true) {
    yield delay(1000);

    console.log(
      'Check / take any new build requests added to active build request list by user'
    );

    yield delay(1000);
    console.log(
      'Compute the required workflow for this build request (given the current active service providers in the factory'
    );

    yield delay(1000);
    console.log('Recompute economics of Factory');
  }
}

//import { delay, takeEvery } from 'redux-saga/effects';

//export function* watchRequestAddBuildRequestSaga() {
// Service providers are automatically looking out for compatible un-allocated actions from the factory.

//yield takeEvery(requestBidBuildRequest.type, buildRequestBidSaga);
//}
