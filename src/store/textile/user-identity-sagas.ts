import { PrivateKey } from '@textile/hub';
import { call, put } from 'redux-saga/effects';
import { setUser } from './slice';

/**
 * Runs a simple fixed market simulation.
 * Parts are randomly added and removed after a certain time.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* generateIdentity() {
  console.log('Generating user identity');

  const privateKey: PrivateKey = yield call(PrivateKey.fromRandom);

  /** Convert to string. */
  //const identityString = identity.toString();

  /** Restore an identity object from a string */
  //const restored = PrivateKey.fromString(identityString);

  yield put(
    setUser({
      privateKey,
    })
  );
}
