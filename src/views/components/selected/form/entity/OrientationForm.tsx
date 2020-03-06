import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import { RootState, RootDispatch } from '../../../../../store';
import { Identity } from '../../../../../store/common/identity/types';
import { ReduxFormParameterUpdate } from '../../../../../store/selected/types';
import { createExistingIdentity } from '../../../../../store/common/identity/factories';
import { createNumberParameter } from '../../../../../store/common/parameter/factories';
import {
  selectedServiceProviderSelector,
  selectedServiceProviderOrientationSelector
} from '../../../../../store/selected/selectors';
import { setServiceProviderParameter } from '../../../../../store/factory/slice';

import { Grid } from '@material-ui/core';
import { BasicParameter } from '../parameter/BasicParameter';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function mapState(state: RootState) {
  return {
    selectedServiceProvider: selectedServiceProviderSelector(state),
    initialValues: selectedServiceProviderOrientationSelector(state)
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onNumberParameterChange: (
      selectedServiceProviderId: Identity,
      serviceProviderProperty: string[],
      parameterUpdate: ReduxFormParameterUpdate,
      units: string
    ) => {
      console.log(
        `Parameter ${parameterUpdate.target.name} Changed to ${parameterUpdate.target.value}`
      );
      dispatch(
        setServiceProviderParameter({
          serviceProviderId: selectedServiceProviderId,
          serviceProviderProperty,
          parameter: createNumberParameter(
            createExistingIdentity(
              parameterUpdate.target.name,
              parameterUpdate.target.name
            ),
            units,
            Number(parameterUpdate.target.value)
          )
        })
      );
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function OrientationForm(props: Props & InjectedFormProps<{}, Props>) {
  const { selectedServiceProvider, onNumberParameterChange } = props;

  if (!selectedServiceProvider) return <div />;

  const fixedProps = {
    title: 'Orientation',
    name: 'orientation',
    units: ''
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={fixedProps.name}
        id={fixedProps.name}
      >
        <Typography>{fixedProps.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form>
          <Grid container>
            {Object.keys(selectedServiceProvider.orientation).map(key => {
              return (
                <Grid key={key} item xs={3}>
                  <Field
                    name={key}
                    displayName={`${key.toUpperCase()}`}
                    component={BasicParameter}
                    type="number"
                    parse={(value: string) => Number(value)}
                    onChange={(change: ReduxFormParameterUpdate) =>
                      onNumberParameterChange(
                        selectedServiceProvider.id,
                        [fixedProps.name, key],
                        change,
                        fixedProps.units
                      )
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default connector(
  reduxForm<{}, Props>({
    form: 'orientationForm',
    enableReinitialize: true
  })(OrientationForm)
);
