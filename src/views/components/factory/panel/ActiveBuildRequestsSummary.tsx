import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { config } from '../../../../env/config';
import { RootState, RootDispatch } from '../../../../store';
import { setSelectedPrimaryFocusBuildRequest } from '../../../../store/selected/slice';
import {
  factoryBuildRequestsSelector,
  isAllowedToBidSelector
} from '../../../../store/factory/selectors';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Typography, CardContent } from '@material-ui/core';

function mapState(state: RootState) {
  return {
    buildRequests: factoryBuildRequestsSelector(state),
    isAllowedToBid: isAllowedToBidSelector(state)
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onActiveBuildRequestSelected: (id: string) => {
      dispatch(setSelectedPrimaryFocusBuildRequest(id));
    }
  };
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

  const {
    buildRequests: activeBuildRequests,
    isAllowedToBid,
    onActiveBuildRequestSelected
  } = props;

  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Active Build Requests
        </Typography>
        {!isAllowedToBid ? (
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            (at max factory capacity: {config.factory.maxNumberActiveBuilds})
          </Typography>
        ) : (
          <div />
        )}
        {activeBuildRequests.length > 0 ? (
          activeBuildRequests.map(activeBuildRequest => (
            <div key={activeBuildRequest.id}>
              <Typography color="textPrimary">
                {activeBuildRequest.displayName}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {activeBuildRequest.id}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={_ =>
                  onActiveBuildRequestSelected(activeBuildRequest.id)
                }
              >
                Details
              </Button>
            </div>
          ))
        ) : (
          <Typography
            className={classes.comment}
            color="textPrimary"
            gutterBottom
          >
            No active build requests... Bid from the market panel?
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default connector(ActiveBuildRequestsSummary);
