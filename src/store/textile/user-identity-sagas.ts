import { Client, Identity, PrivateKey } from '@textile/hub';
import { call, put } from 'redux-saga/effects';
import { createInsecureKey } from './factories';
import { setUser, setToken } from './slice';
import { User } from './types';

// Creates a PrivateKey and stores in Redux (probably not a secure/good idea long term)
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

  // Place method call inside closure to ensure that client is captured.
  const token: string = yield call(async () => {
    return await client.getToken(user.identity);
  });

  // Update store
  yield put(setToken(token));

  // Return value
  return token;
}

export function* experimentalTextileSaga() {
  const user: User = yield generateIdentitySaga();
  yield authoriseInsecureSaga(user);
}
