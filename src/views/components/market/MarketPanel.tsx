import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../store';
import { buildRequestsSelector } from '../../../store/market/selectors';
import { isAllowedToBidSelector } from '../../../store/factory/selectors';

import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BuildRequest from './BuildRequest';

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

  return (
    <Box className={classes.container}>
      <Grid container spacing={3}>
        {buildRequests.map(buildRequest => (
          <Grid item xs={12} key={buildRequest.identity.uuid}>
            <BuildRequest
              isAllowedToBid={isAllowedToBid}
              buildRequest={buildRequest}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default connector(MarketPanel);
