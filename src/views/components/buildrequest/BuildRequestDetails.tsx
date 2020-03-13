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
  CardActions,
  Box
} from '@material-ui/core';
import ActivityDetails from './ActivityDetails';

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
    maxHeight: '80vh' // Couldn't find a nicer way. Be cool if I could reference the max height of
  },
  internalContainer: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
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
  const {
    identity,
    created,
    material,
    endShape,
    scale,
    fixedValue,
    workflow
  } = buildRequest;

  const WorkflowsCardContent = () => {
    if (workflow && workflow.activities.length > 0) {
      return (
        <Card className={classes.internalContainer}>
          <Typography variant="h5" component="h2" className={classes.pos}>
            {workflow.identity.displayName}
          </Typography>
          {workflow.activities.map(activity => {
            return (
              <ActivityDetails
                key={activity.identity.uuid}
                activity={activity}
              />
            );
          })}
        </Card>
      );
    } else {
      return <Typography color="textSecondary">Generating...</Typography>;
    }
  };

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
          {identity.displayName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {identity.uuid}
        </Typography>
        <Box>
          <Typography color="textPrimary">
            Created: {created.toLocaleTimeString()}
          </Typography>
          <Typography color="textPrimary">
            Value: ${fixedValue.dollars}
          </Typography>
          <Typography color="textPrimary">
            Material: {material.type.toString()}
          </Typography>
          <Typography color="textPrimary">
            Shape: {endShape.toString()}
          </Typography>
          <Typography color="textPrimary">Scale: {scale}m</Typography>
        </Box>
        <WorkflowsCardContent />
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
