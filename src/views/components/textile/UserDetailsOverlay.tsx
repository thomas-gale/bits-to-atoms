import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store';
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

const useStyles = makeStyles((theme) => ({
  UserDetailsOverlay: {
    margin: theme.spacing(2),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

function UserDetailsOverlay(props: Props) {
  const classes = useStyles();
  const { identityPublicKey, token, collections } = props;

  return (
    <Card id="UserDetailsOverlay" className={classes.UserDetailsOverlay}>
      <CardContent className={classes.UserDetailsOverlay}>
        <Typography className={classes.Heading}>Public Key</Typography>
        <Typography noWrap={true} className={classes.Content}>
          {identityPublicKey}
        </Typography>
        <br />
        <Typography className={classes.Heading}>Token</Typography>
        <Typography noWrap={true} className={classes.Content}>
          {token}
        </Typography>
        <br />
        <Typography className={classes.Heading}>Collections</Typography>
        {collections &&
          collections.map((collection) => (
            <div key={collection.name}>
              <Typography className={classes.Mid}>{collection.name}</Typography>
              <Typography noWrap={true} className={classes.Content}>
                Schema: {collection.schema}
              </Typography>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

export default connector(UserDetailsOverlay);
