import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../../../store';
import { selectedServiceProviderSelector } from '../../../../../store/selected/selectors';

import { Typography, makeStyles } from '@material-ui/core';

function mapState(state: RootState) {
  return {
    selected: selectedServiceProviderSelector(state),
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles((_) => ({
  pos: {
    marginBottom: 12,
  },
}));

function IdentityForm(props: Props) {
  const { selected } = props;
  const classes = useStyles();
  if (!selected) return null;
  return (
    <div>
      <Typography variant="h5" component="h2">
        {selected.displayName}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {selected.id}
      </Typography>
    </div>
  );
}

export default connector(IdentityForm);
