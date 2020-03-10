import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { RootDispatch } from '../../../store';
import { Identity } from '../../../store/common/identity/types';
import { BuildRequest } from '../../../store/market/types';
import { Button, Card, Grid, Grow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function mapDispatch(dispatch: RootDispatch) {
  return {
    onBidClicked: (id: Identity) => {
      console.log(`Bid clicked for BuildRequest: ${id.uuid}`);
    }
  };
}

const connector = connect(null, mapDispatch);

interface OwnProps {
  buildRequest: BuildRequest;
}

type Props = ConnectedProps<typeof connector> & OwnProps;

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
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

function BuildRequestElement(props: Props) {
  const classes = useStyles();
  const { onBidClicked } = props;
  const { identity, created, fixedValue } = props.buildRequest;

  return (
    <Grow in={true}>
      <Card className={classes.root}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Build Request
        </Typography>
        <Typography variant="h5" component="h2">
          {identity.displayName}
        </Typography>
        <Typography className={classes.subTitle} color="textSecondary">
          {identity.uuid}
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
              onClick={_ => onBidClicked(identity)}
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
      </Card>
    </Grow>
  );
}

export default connector(BuildRequestElement);
