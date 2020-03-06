import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, RootDispatch } from '../../../../../store';
import {
  selectedServiceProviderSelector,
  selectedServiceProviderLocationSelector
} from '../../../../../store/selected/selectors';

import { Identity } from '../../../../../store/common/identity/types';
import { ReduxFormParameterUpdate } from '../../../../../store/selected/types';
import { createExistingIdentity } from '../../../../../store/common/identity/factories';
import { setServiceProviderParameter } from '../../../../../store/factory/slice';

import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { BasicParameter } from '../parameter/BasicParameter';
import { createNumberParameter } from '../../../../../store/common/parameter/factories';
import { Grid } from '@material-ui/core';

function mapState(state: RootState) {
  return {
    selectedServiceProvider: selectedServiceProviderSelector(state),
    initialValues: selectedServiceProviderLocationSelector(state)
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

function LocationForm(props: Props & InjectedFormProps<{}, Props>) {
  const { selectedServiceProvider, onNumberParameterChange } = props;

  if (!selectedServiceProvider) return <div />;

  const fixedProps = {
    name: 'location',
    units: 'm'
  };

  return (
    <form>
      <Grid container>
        {Object.keys(selectedServiceProvider.location).map(key => {
          return (
            <Grid key={key} item xs={4}>
              <Field
                name={key}
                displayName={`${key.toUpperCase()} (${fixedProps.units})`}
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
  );
}

export default connector(
  reduxForm<{}, Props>({
    form: 'locationForm',
    enableReinitialize: true
  })(LocationForm)
);
