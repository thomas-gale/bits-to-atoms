export enum MarketFactoryPanelVisibilty {
  None,
  Market,
  Factory
}

export type ReduxFormParameterUpdate = {
  target: {
    name: string;
    value: string;
  };
};
