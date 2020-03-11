import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { config } from '../../../../env/config';
import { RootState, RootDispatch } from '../../../../store';
import { factoryActiveBuildRequestsSelector } from '../../../../store/factory/selectors';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent } from '@material-ui/core';

function mapState(state: RootState) {
  return {
    activeBuildRequests: factoryActiveBuildRequestsSelector(state)
  };
}

function mapDispatch(_dispatch: RootDispatch) {
  return {};
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(_theme => ({
  container: {
    flexGrow: 1
  },
  title: {
    fontSize: 14
  },
  comment: {
    fontSize: 12
  }
}));

function ActiveBuildRequestsSummary(props: Props): JSX.Element {
  const classes = useStyles();

  const { activeBuildRequests } = props;

  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Active Build Requests (max factory capacity{' '}
          {config.factory.maxNumberActiveBuilds})
        </Typography>
        {activeBuildRequests.length > 0 ? (
          activeBuildRequests.map(activeBuildRequest => (
            <div key={activeBuildRequest.identity.uuid}>
              <Typography color="textPrimary">
                {activeBuildRequest.identity.displayName}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {activeBuildRequest.identity.uuid}
              </Typography>
            </div>
          ))
        ) : (
          <Typography
            className={classes.comment}
            color="textSecondary"
            gutterBottom
          >
            No active build requests... Check the market panel?
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default connector(ActiveBuildRequestsSummary);
