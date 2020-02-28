import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography, CardActions, Button, CardContent } from '@material-ui/core';

import { RootState } from '../../store';

function mapState(_: RootState) {
  return {};
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    flexGrow: 1,
  },
  title: {
    fontSize: 14
  }
}));

function SelectedPanel(): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Properties
        </Typography>
        <Typography variant="h5" component="h2">
          Something Clicked On
        </Typography>
        <Typography color="textSecondary">
          Property 1
        </Typography>
        <Typography color="textSecondary">
          Property 2
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Do Something</Button>
      </CardActions>
    </Card>
  );
}

export default connector(SelectedPanel);
