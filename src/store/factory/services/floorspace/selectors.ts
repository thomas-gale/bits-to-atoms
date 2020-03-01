import { RootState } from '../../..';

export const floorSpaceSelector = (state: RootState) =>
  state.factory.services.floorSpace;