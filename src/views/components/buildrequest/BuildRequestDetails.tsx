import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, RootDispatch } from '../../../store';
import { BuildRequest } from '../../../store/buildrequest/types';
import { unSelectPrimaryFocusBuildRequest } from '../../../store/selected/slice';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Typography,
  CardContent,
  CardActions
} from '@material-ui/core';

function mapState(_state: RootState) {
  return {};
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onCloseClicked: () => {
      dispatch(unSelectPrimaryFocusBuildRequest());
    }
  };
}

const connector = connect(mapState, mapDispatch);

interface OwnProps {
  buildRequest: BuildRequest;
}

type Props = ConnectedProps<typeof connector> & OwnProps;

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2),
    flexGrow: 1,
    overflow: 'auto',
    maxHeight: '90vh' // Couldn't find a nicer way. Be cool if I could reference the max height of
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

function BuildRequestDetails(props: Props): JSX.Element {
  const classes = useStyles();

  const { buildRequest, onCloseClicked } = props;

  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Build Request Details
        </Typography>
        <Typography variant="h5" component="h2">
          {buildRequest.identity.displayName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {buildRequest.identity.uuid}
        </Typography>
        <Typography color="textPrimary">
          Summary of Build Request Value / Age
        </Typography>
        <Typography color="textPrimary">
          Summary of Factory Auto Assigned Workflow (With current status)
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" size="small" onClick={onCloseClicked}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
}

export default connector(BuildRequestDetails);