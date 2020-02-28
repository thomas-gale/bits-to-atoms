import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Identity } from '../../../store/common/types';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export function BuildRequest(identity: Identity) {
  const classes = useStyles();
  const { uuid, displayName } = identity;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Build Request
        </Typography>
        <Typography variant="h5" component="h2">
          {displayName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {uuid}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" size="small">
          Bid
        </Button>
      </CardActions>
    </Card>
  );
}
