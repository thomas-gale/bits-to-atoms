import { RootState } from '..';

export const informationOverlayVisibleSelector = (state: RootState) =>
  state.information.informationOverlayVisible;
