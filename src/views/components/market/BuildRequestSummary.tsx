import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { RootDispatch } from '../../../store';
import { BuildRequest } from '../../../store/buildrequest/types';
import { requestBidBuildRequest } from '../../../store/market/slice';
import { Button, Card, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function mapDispatch(dispatch: RootDispatch) {
  return {
    onBidClicked: (buildRequest: BuildRequest) => {
      dispatch(requestBidBuildRequest(buildRequest));
    }
  };
}

const connector = connect(null, mapDispatch);

interface OwnProps {
  isAllowedToBid: boolean;
  buildRequest: BuildRequest;
}

type Props = ConnectedProps<typeof connector> & OwnProps;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    padding: theme.spacing(2)
  },
  title: {
    fontSize: 14
  },
  subTitle: {
    fontSize: 11,
    marginBottom: theme.spacing(2)
  },
  footer: {
    marginTop: theme.spacing(2)
  },
  comment: {
    fontSize: 11
  }
}));

function BuildRequestElement(props: Props) {
  const classes = useStyles();
  const { isAllowedToBid, onBidClicked } = props;
  const { identity, created, fixedValue } = props.buildRequest;

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Build Request
      </Typography>
      <Typography variant="h5" component="h2">
        {identity.displayName}
      </Typography>
      <Typography className={classes.subTitle} color="textSecondary">
        {identity.id}
      </Typography>
      <Typography color="textSecondary">
        Created: {created.toLocaleTimeString()}
      </Typography>

      <Grid
        className={classes.footer}
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={_ => onBidClicked(props.buildRequest)}
            disabled={!isAllowedToBid}
          >
            Bid
          </Button>
        </Grid>
        <Grid item>
          <Typography color="textSecondary">
            Value: ${fixedValue.dollars}
          </Typography>
        </Grid>
      </Grid>
      {!isAllowedToBid && (
        <Typography className={classes.comment} color="textSecondary">
          Bidding disabled - factory at max capacity
        </Typography>
      )}
    </Card>
  );
}

export default connector(BuildRequestElement);
