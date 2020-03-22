import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootDispatch } from '../../../store';
import { Activity } from '../../../store/workflow/types';

import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function mapDispatch(_dispatch: RootDispatch) {
  return {};
}

const connector = connect(null, mapDispatch);

interface OwnProps {
  activity: Activity;
}

type Props = ConnectedProps<typeof connector> & OwnProps;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2)
  },
  title: {
    fontSize: 14
  },
  subTitle: {
    marginBottom: theme.spacing(2)
  },
  footer: {
    marginTop: theme.spacing(2)
  }
}));

function ActivityDetails(props: Props) {
  const classes = useStyles();
  const { activity } = props;

  return (
    <Card className={classes.container}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Activity
      </Typography>
      <Typography>{activity.displayName}</Typography>
      <Typography className={classes.subTitle} color="textSecondary">
        {activity.id}
      </Typography>
      <Typography color="textSecondary">
        Type: {activity.type.toString()}
      </Typography>
      <Typography color="textSecondary">
        Started:{' '}
        {activity.started
          ? activity.started.toLocaleTimeString()
          : 'Not started...'}
      </Typography>
      <Typography color="textSecondary">
        Completed:{' '}
        {activity.completed
          ? activity.completed.toLocaleTimeString()
          : 'Not completed...'}
      </Typography>
      <Typography color="textSecondary">
        Assigned Service Provider:{' '}
        {activity.serviceProvider
          ? activity.serviceProvider
          : 'Not assigned to service provider...'}
      </Typography>
    </Card>
  );
}

export default connector(ActivityDetails);
