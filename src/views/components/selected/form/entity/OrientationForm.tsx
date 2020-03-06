import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, RootDispatch } from '../../../../../store';
import {
  selectedServiceProviderIdSelector,
  selectedServiceProviderOrientationSelector
} from '../../../../../store/selected/selectors';

import { Identity } from '../../../../../store/common/identity/types';
import { ReduxFormParameterUpdate } from '../../../../../store/selected/types';
import { createExistingIdentity } from '../../../../../store/common/identity/factories';
import { setServiceProviderParameter } from '../../../../../store/factory/slice';

import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { BasicParameter } from '../parameter/BasicParameter';
import { createNumberParameter } from '../../../../../store/common/parameter/factories';

function mapState(state: RootState) {
  return {
    selectedId: selectedServiceProviderIdSelector(state),
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
  const { selectedId, onNumberParameterChange } = props;

  return (
    <form>
      <Field
        key={'x'}
        name={'x'}
        displayName="X"
        component={BasicParameter}
        type="number"
        parse={(value: string) => Number(value)}
        onChange={(change: ReduxFormParameterUpdate) =>
          onNumberParameterChange(selectedId, ['orientation', 'x'], change, '')
        }
      />
      <Field
        key={'y'}
        name={'y'}
        displayName="Y"
        component={BasicParameter}
        type="number"
        parse={(value: string) => Number(value)}
        onChange={(change: ReduxFormParameterUpdate) =>
          onNumberParameterChange(selectedId, ['orientation', 'y'], change, '')
        }
      />
      <Field
        key={'z'}
        name={'z'}
        displayName="Z"
        component={BasicParameter}
        type="number"
        parse={(value: string) => Number(value)}
        onChange={(change: ReduxFormParameterUpdate) =>
          onNumberParameterChange(selectedId, ['orientation', 'z'], change, '')
        }
      />
      <Field
        key={'w'}
        name={'w'}
        displayName="W"
        component={BasicParameter}
        type="number"
        parse={(value: string) => Number(value)}
        onChange={(change: ReduxFormParameterUpdate) =>
          onNumberParameterChange(selectedId, ['orientation', 'w'], change, '')
        }
      />
    </form>
  );
}

export default connector(
  reduxForm<{}, Props>({
    form: 'orientationForm',
    enableReinitialize: true
  })(OrientationForm)
);
