import { Client, Identity, PrivateKey } from '@textile/hub';
import { call, put } from 'redux-saga/effects';
import { createInsecureKey } from './factories';
import { setUser, setToken } from './slice';
import { User } from './types';

// Creates a PrivateKey and stores in Redux (probably not a secure/good idea long term)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* generateIdentitySaga() {
  console.log('Generating user identity...');
  const identity: Identity = PrivateKey.fromRandom();
  const user: User = {
    identity,
  };

  // Update store
  yield put(setUser(user));

  // Return value
  return user;
}

export function* authoriseInsecureSaga(user: User) {
  console.log('Authorise user insecure...');

  const key = createInsecureKey();
  const client: Client = yield call(Client.withKeyInfo, key);

  //const token: string = yield call(client.getToken, user.identity, undefined);

  const token: string = yield call(async () => {
    return await client.getToken(user.identity);
  });

  /*
  client
    .getToken(user.identity)
    .then((token) => console.log('Token: ' + token));
*/

  //console.log('Token generated: ' + token);

  // Update store
  yield put(setToken(token));

  // Return value
  return token;
}

export function* experimentalTextileSaga() {
  const user: User = yield generateIdentitySaga();
  yield authoriseInsecureSaga(user);
}
