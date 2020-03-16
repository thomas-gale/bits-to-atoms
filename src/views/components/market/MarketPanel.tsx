import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { animated, useTransition } from 'react-spring';

import { RootState } from '../../../store';
import { buildRequestsSelector } from '../../../store/market/selectors';
import { isAllowedToBidSelector } from '../../../store/factory/selectors';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BuildRequest from './BuildRequestSummary';

function mapState(state: RootState) {
  return {
    buildRequests: buildRequestsSelector(state),
    isAllowedToBid: isAllowedToBidSelector(state)
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    flexGrow: 1,
    width: '100%',
    overflow: 'auto',
    maxHeight: '80vh' // Couldn't find a nicer way. Be cool if I could reference the max height of
  },
  card: {
    position: 'absolute',
    width: '23%' // Needs to inherit from measured parent (size-me!)
    //width: '25vw'
    //margin: theme.spacing(2),
    //will-change: transform, height, opacity;
  }
}));

function MarketPanel(panelProps: Props): JSX.Element {
  const classes = useStyles();
  const { buildRequests, isAllowedToBid } = panelProps;

  const hackedElementHeight = 240; // TODO: Fix this to read / be aware of contents height.
  let height = 0; // Cumulative height
  const transBuildRequests = useTransition(
    buildRequests.map(buildRequest => ({
      ...buildRequest,
      y: (height += hackedElementHeight) - hackedElementHeight,
      height: hackedElementHeight
    })),
    buildRequests => buildRequests.identity.uuid,
    {
      //initial: { transform: 'translate3d(0%, 0%,0) scale(1)', opacity: 1 },
      from: { height: 0, opacity: 0 }, //'translate3d(0%,-50%,0) scale(0)'
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }), // }{ transform: 'translate3d(0%, 0%,0) scale(1)', opacity: 1 },
      update: ({ y, height }) => ({ y, height }), //, { transform: 'translate3d(0%, 0%,0) scale(1)', opacity: 1 },
      config: { tension: 500 }
    }
  );

  return (
    <Box className={classes.container}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {transBuildRequests.map(({ item, props, key }: any) => (
        <animated.div
          key={key}
          className={classes.card}
          style={{
            transform: props.y.interpolate(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (y: any) => `translate3d(0,${y}px,0)`
            ),
            opacity: props.opacity,
            height: props.height
          }}
        >
          <BuildRequest isAllowedToBid={isAllowedToBid} buildRequest={item} />
        </animated.div>
      ))}
    </Box>
  );
}

export default connector(MarketPanel);
