import { Client, ThreadID } from '@textile/hub';
import { RootState } from '..';
import { Collection } from './types';

export const userIdentityDetailsOverlayVisibleSelector = (
  state: RootState
): boolean => state.textile.detailsVisible;

export const identityPublicKeySelector = (
  state: RootState
): string | undefined => state.textile?.identity?.toString();

export const tokenSelector = (state: RootState): string | undefined =>
  state.textile?.token;

export const clientSelector = (state: RootState): Client | undefined =>
  state.textile?.client;

export const threadSelector = (state: RootState): ThreadID | undefined =>
  state.textile?.thread;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const collectionsSelector = (
  state: RootState
): Collection[] | undefined => state.textile?.collections;
