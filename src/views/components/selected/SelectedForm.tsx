import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Field, InjectedFormProps, reduxForm, FormSection } from 'redux-form';

import { BasicParameter } from './parameter/BasicParameter';

import { RootState, AppDispatch } from '../../../store';
//import { Parameter } from '../../../store/common/parameter/types';
import { FloorSpace } from '../../../store/factory/services/floorspace/types';
import {
  selectedServiceProviderSelector
  //selectedParametersSelector,
  //selectedParameterInitialValuesSelector
} from '../../../store/selected/selectors';
import { setServiceProviderParameter } from '../../../store/factory/slice';
import { Identity } from '../../../store/common/identity/types';
import {
  ParameterType,
  NumberParameter
} from '../../../store/common/parameter/types';
import { createExistingIdentity } from '../../../store/common/identity/factories';

type ParameterUpdate = {
  target: {
    name: string;
    value: string;
  };
};

function mapState(state: RootState) {
  return {
    //parameters: selectedServiceProviderSelector(state),
    initialValues: selectedServiceProviderSelector(state)
  };
}

function mapDispatch(dispatch: AppDispatch) {
  return {
    /*handleSubmit: (_: FloorSpace) => {
      console.log('Submit to be handled');
    },
    setParameter: () => {
      console.log('Parameter Set');
    },*/
    onNumberParameterChange: (
      parameterUpdate: ParameterUpdate,
      selectedServiceProviderId: Identity,
      units: string
    ) => {
      console.log(
        `Parameter ${parameterUpdate.target.name} Changed to ${parameterUpdate.target.value}`
      );
      dispatch(
        setServiceProviderParameter({
          serviceProviderId: selectedServiceProviderId,
          parameter: {
            identity: createExistingIdentity(
              parameterUpdate.target.name,
              parameterUpdate.target.name
            ),
            type: ParameterType.Number,
            units,
            value: Number(parameterUpdate.target.value)
          } as NumberParameter
        })
      );
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

class SelectedForm extends React.Component<
  Props & InjectedFormProps<FloorSpace, Props>
> {
  render() {
    const { initialValues, onNumberParameterChange } = this.props;
    if (!initialValues) return <div />;
    return (
      <form>
        {/*Location Section*/}
        <FormSection name={'location'}>
          <Field
            key={'x'}
            name={'x'}
            component={BasicParameter}
            type="number"
            parse={(value: string) => Number(value)}
            //onChange={() => onParameterChange()}
            onChange={(change: ParameterUpdate) =>
              onNumberParameterChange(change, initialValues.id, 'm')
            }
            //parameter={parameter}
          />
        </FormSection>

        {/*parameters.map((parameter: Parameter) => {
          return (
            <Field
              key={parameter.identity.uuid}
              name={parameter.identity.uuid}
              component={BasicParameter}
              type="number"
              parse={(value: string) => Number(value)}
              //onChange={() => onParameterChange()}
              onChange={onParameterChange}
              parameter={parameter}
            />
          );
        })*/}
        {/*<Button type="submit" color="primary" size="small">
          Update
      </Button>*/}
      </form>
    );
  }
}

export default connector(
  reduxForm<FloorSpace, Props>({
    form: 'selectedForm',
    enableReinitialize: true
  })(SelectedForm)
);
