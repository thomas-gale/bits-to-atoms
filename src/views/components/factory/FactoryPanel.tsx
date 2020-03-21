import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, RootDispatch } from '../../../store';
import { setMarketFactoryPanelVisibilty } from '../../../store/selected/slice';
import { factorySelector } from '../../../store/factory/selectors';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Typography,
  CardContent,
  CardActions
} from '@material-ui/core';
import FactoryEconomicSummary from './panel/FactoryEconomicSummary';
import ActiveBuildRequestsSummary from './panel/ActiveBuildRequestsSummary';
import { MarketFactoryPanelVisibilty } from '../../../store/selected/types';

function mapState(state: RootState) {
  return {
    factory: factorySelector(state)
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onCloseClicked: () => {
      dispatch(
        setMarketFactoryPanelVisibilty(MarketFactoryPanelVisibilty.None)
      );
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2),
    flexGrow: 1,
    overflow: 'auto',
    maxHeight: '90vh' // Couldn't find a nicer way. Be cool if I could reference the max height of
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

function FactoryPanel(props: Props): JSX.Element {
  const classes = useStyles();

  const { factory, onCloseClicked } = props;

  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Factory Overview
        </Typography>
        <Typography variant="h5" component="h2">
          {factory.displayName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {factory.id}
        </Typography>
        <FactoryEconomicSummary />
        <ActiveBuildRequestsSummary />
      </CardContent>
      <CardActions>
        <Button color="primary" size="small" onClick={onCloseClicked}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
}

export default connector(FactoryPanel);
