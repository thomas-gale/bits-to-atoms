import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

import { RootState } from '../../../store';
import { BuildRequest } from './BuildRequest';
import { buildRequestsSelector } from '../../../store/market/selectors';

function mapState(state: RootState) {
  return {
    buildRequests: buildRequestsSelector(state)
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    flexGrow: 1
  }
}));

function MarketPanel(props: Props): JSX.Element {
  const classes = useStyles();
  const { buildRequests } = props;
  return (
    <Box className={classes.container}>
      <Grid container spacing={3}>
        {buildRequests.map(request => {
          return (
            <Grid item xs={12} key={request.identity.uuid}>
              <BuildRequest
                uuid={request.identity.uuid}
                displayName={request.identity.displayName}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default connector(MarketPanel);
