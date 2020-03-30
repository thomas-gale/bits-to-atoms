export const config = {
  topNav: {
    gitHubURL: 'https://github.com/ThomasGale/bits-to-atoms',
  },
  information: {
    gitHubAPILatestReleaseEndPoint:
      'https://api.github.com/repos/thomasgale/bits-to-atoms/releases/latest',
  },
  market: {
    simpleMarketSaga: {
      partNames: [
        'widget',
        'thingy',
        'thingybob',
        'whatchamacallit',
        'thingamajig',
        'doohickey',
        'doofery',
        'thatthing',
      ],
      partValueRange: {
        min: 5,
        max: 10,
      },
      maxNumberOpenRequests: 3,
      processingDelayRange: {
        min: 10000,
        max: 20000,
      },
    },
  },
  factory: {
    updatePeriodMs: 1000,
    maxNumberActiveBuilds: 1,
  },
};
