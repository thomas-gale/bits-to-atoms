import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { animated, useTransition } from 'react-spring';

import { RootState } from '../../../store';
import { buildRequestsSelector } from '../../../store/market/selectors';
import { isAllowedToBidSelector } from '../../../store/factory/selectors';

import { Box, Grid } from '@material-ui/core';
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
    overflow: 'auto',
    maxHeight: '90vh' // Couldn't find a nicer way. Be cool if I could reference the max height of
  }
}));

function MarketPanel(props: Props): JSX.Element {
  const classes = useStyles();
  const { buildRequests, isAllowedToBid } = props;

  const transBuildRequests = useTransition(
    buildRequests,
    buildRequests => buildRequests.identity.uuid,
    {
      initial: { transform: 'translate3d(0%, 0%,0) scale(1)', opacity: 1 },
      from: { transform: 'translate3d(0%,-50%,0) scale(0)', opacity: 0 },
      enter: { transform: 'translate3d(0%, 0%,0) scale(1)', opacity: 1 },
      leave: { transform: 'translate3d(0%,-50%,0) scale(0)', opacity: 0 }
    }
  );

  return (
    <Box className={classes.container}>
      <Grid container spacing={3}>
        {transBuildRequests.map(({ item, props, key }) => (
          <Grid item xs={12} key={key}>
            <animated.div key={key} style={props}>
              <BuildRequest
                isAllowedToBid={isAllowedToBid}
                buildRequest={item}
              />
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default connector(MarketPanel);
