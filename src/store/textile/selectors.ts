import { RootState } from '..';

export const userIdentityDetailsOverlayVisibleSelector = (
  state: RootState
): boolean => state.textile.detailsVisible;

export const userIdentityPublicKeySelector = (
  state: RootState
): string | undefined => state.textile.user?.privateKey.toString();
