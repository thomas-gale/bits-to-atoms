import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../store';
import { selectedServiceProviderSelector } from '../../../store/selected/selectors';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent } from '@material-ui/core';
import IdentityForm from './form/entity/IdentityForm';
import LocationForm from './form/entity/LocationForm';
import OrientationForm from './form/entity/OrientationForm';

function mapState(state: RootState) {
  return {
    selected: selectedServiceProviderSelector(state),
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
    flexGrow: 1,
    overflow: 'auto',
    maxHeight: '80vh', // Couldn't find a nicer way. Be cool if I could reference the max height of
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function SelectedPanel(props: Props): JSX.Element {
  const classes = useStyles();

  const { selected } = props;

  if (!selected) {
    return <div />;
  }

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
        <IdentityForm />
        <LocationForm />
        <OrientationForm />
      </CardContent>
    </Card>
  );
}

export default connector(SelectedPanel);
