import { Client, Identity, PrivateKey } from '@textile/hub';
import { call, put } from 'redux-saga/effects';
import { createUuid } from '../common/identity/factories';
import { createInsecureKey, createThreadID } from './factories';
import { setIdentity, setClient, setThread, setToken } from './slice';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Test function
// Creates a PrivateKey and stores in Redux (probably not a secure/good idea long term)
export function* generateIdentitySaga() {
  console.log('Generating user identity...');
  const identity: Identity = PrivateKey.fromRandom();

  // Update store
  yield put(setIdentity(identity));

  // Return value
  return identity;
}

// Test function
// Uses the insecure test key in the config, attempts to get a token on behalf of the current user.
export function* authoriseInsecureSaga(identity: Identity) {
  console.log('Authorise user insecure...');

  const key = createInsecureKey();
  const client: Client = yield call(Client.withKeyInfo, key);

  // Place method call inside closure to ensure that client is captured.
  const token: string = yield call(async () => {
    return await client.getToken(identity);
  });

  // Update store
  yield put(setToken(token));
  yield put(setClient(client));

  // Return authorised client
  return client;
}

// Test function
// Test chatting with threadsdb
export function* existingThreadDb(client: Client) {
  // Get exisiting ThreadId
  const threadID = createThreadID();

  // Update store with thread id.
  yield put(setThread(threadID));

  // Create new DB
  /*yield call(async () => {
    return await client.open(threadID, config.textile.threadName);
  });*/

  // Create a new Collection from an Object
  const buzz = {
    name: 'Buzz-' + getRandomInt(1, 1000),
    missions: getRandomInt(0, 16),
    _id: createUuid(),
  };

  // Create a new Collection from an Object
  /*yield call(
    async () =>
      await client.newCollectionFromObject(threadID, buzz, {
        name: 'astronauts',
      })
  );*/

  // Store the buzz object in the new collection
  yield call(async () => await client.create(threadID, 'astronauts', [buzz]));

  return threadID;
}

export function* experimentalTextileSaga() {
  try {
    const identity: Identity = yield generateIdentitySaga();
    const client: Client = yield authoriseInsecureSaga(identity);
    yield existingThreadDb(client);
  } catch (error) {
    console.log('Error: ' + error);
    throw error;
  }
}
