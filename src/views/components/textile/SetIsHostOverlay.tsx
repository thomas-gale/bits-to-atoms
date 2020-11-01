import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootDispatch, RootState } from '../../../store';
import {
  identityPublicKeySelector,
  tokenSelector,
  collectionsSelector,
} from '../../../store/textile/selectors';

function mapState(state: RootState) {
  return {
    identityPublicKey: identityPublicKeySelector(state),
    token: tokenSelector(state),
    collections: collectionsSelector(state),
  };
}

function mapDispatch(_: RootDispatch) {
  return {
    onSetHost: () => {
      console.log('Set as Host');
    },
    onSetClient: () => {
      console.log('Set as Client');
    },
  };
}

const useStyles = makeStyles((theme) => ({
  SetIsHostOverlay: {
    margin: theme.spacing(2),
  },
  Heading: {
    fontSize: 16,
  },
  Mid: {
    fontSize: 14,
  },
  Content: {
    fontSize: 11,
    fontStyle: 'italic',
  },
}));

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function SetIsHostOverlay(props: Props) {
  const classes = useStyles();
  const { onSetHost, onSetClient } = props;

  return (
    <Card id="SetIsHostOverlay" className={classes.SetIsHostOverlay}>
      <CardContent className={classes.SetIsHostOverlay} color="inherit">
        <Typography className={classes.Heading}>Connection</Typography>
        <Typography className={classes.Mid}>Choose connection mode</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onSetHost}>Host</Button>
        <Button onClick={onSetClient}>Client</Button>
      </CardActions>
    </Card>
  );
}

export default connector(SetIsHostOverlay);
