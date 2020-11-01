import { Client, ThreadID } from '@textile/hub';
import { createSelector } from 'reselect';
import { RootState } from '..';
import { Collection, Textile } from './types';

export const textileSelector = (state: RootState): Textile => state.textile;

export const isHostSelector = createSelector(
  [textileSelector],
  (textile: Textile): undefined | boolean => {
    return textile.isHost;
  }
);

export const userIdentityDetailsOverlayVisibleSelector = createSelector(
  [textileSelector],
  (textile: Textile): boolean => {
    return textile.detailsVisible;
  }
);

export const identityPublicKeySelector = createSelector(
  [textileSelector],
  (textile: Textile): string | undefined => {
    return textile.identity?.toString();
  }
);

export const tokenSelector = createSelector(
  [textileSelector],
  (textile: Textile): string | undefined => {
    return textile.token;
  }
);

export const clientSelector = createSelector(
  [textileSelector],
  (textile: Textile): Client | undefined => {
    return textile.client;
  }
);

export const threadSelector = createSelector(
  [textileSelector],
  (textile: Textile): ThreadID | undefined => {
    return textile.thread;
  }
);

export const collectionsSelector = createSelector(
  [textileSelector],
  (textile: Textile): Collection[] | undefined => {
    return textile.collections;
  }
);
