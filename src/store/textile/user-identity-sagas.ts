import { PrivateKey } from '@textile/hub';
import { put } from 'redux-saga/effects';
import { setUser } from './slice';
/**
 * Runs a simple fixed market simulation.
 * Parts are randomly added and removed after a certain time.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* generateIdentitySaga() {
  console.log('Generating user identity...');

  const privateKey: PrivateKey = PrivateKey.fromRandom();

  /** Convert to string. */
  //const identityString = identity.toString();

  /** Restore an identity object from a string */
  //const restored = PrivateKey.fromString(identityString);

  yield put(
    setUser({
      privateKey,
    })
  );

  //console.log('Complete generating user identity: ' + privateKey.pubKey);
}
