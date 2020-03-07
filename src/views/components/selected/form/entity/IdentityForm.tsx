import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../../../store';
import { selectedServiceProviderIdSelector } from '../../../../../store/selected/selectors';

import { Typography, makeStyles } from '@material-ui/core';

function mapState(state: RootState) {
  return {
    selectedId: selectedServiceProviderIdSelector(state)
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(_ => ({
  pos: {
    marginBottom: 12
  }
}));

function IdentityForm(props: Props) {
  const { selectedId } = props;
  const classes = useStyles();
  if (!selectedId) return null;
  return (
    <div>
      <Typography variant="h5" component="h2">
        {selectedId.displayName}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {selectedId.uuid}
      </Typography>
    </div>
  );
}

export default connector(IdentityForm);
