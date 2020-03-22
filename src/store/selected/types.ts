export enum MarketFactoryPanelVisibilty {
  None = 'None',
  Market = 'Market',
  Factory = 'Factory'
}

export type ReduxFormParameterUpdate = {
  target: {
    name: string;
    value: string;
  };
};
