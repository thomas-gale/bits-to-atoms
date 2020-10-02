import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store';
import { userIdentityPublicKeySelector } from '../../../store/textile/selectors';

function mapState(state: RootState) {
  return {
    userIdentityPublicKey: userIdentityPublicKeySelector(state),
  };
}

const useStyles = makeStyles((theme) => ({
  UserDetailsOverlay: {
    width: '75%',
    padding: theme.spacing(2),
  },
}));

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

function UserDetailsOverlay(props: Props) {
  const classes = useStyles();
  const { userIdentityPublicKey } = props;

  return (
    <Card id="UserDetailsOverlay" className={classes.UserDetailsOverlay}>
      <CardContent>
        <Typography>
          Public Key
          <br />
          {userIdentityPublicKey}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default connector(UserDetailsOverlay);
