import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { rootReducer } from '../../../store';
import { createBuildRequest } from '../../../store/buildrequest/factories';
import BuildRequestSummary from './BuildRequestSummary';

describe('build request summary', () => {
  it.skip('loads and displays build summary that can bid', async () => {
    // Arrange
    const isAllowedToBid = true;
    const buildRequest = createBuildRequest();
    const store = configureStore({
      reducer: rootReducer,
    });

    // Act
    const { getByText } = render(
      <Provider store={store}>
        <BuildRequestSummary
          isAllowedToBid={isAllowedToBid}
          buildRequest={buildRequest}
        />
      </Provider>
    );

    // Assert
    expect(getByText(buildRequest.id)).toHaveTextContent(buildRequest.id);
    expect(getByText(buildRequest.displayName)).toHaveTextContent(
      buildRequest.displayName
    );
  });
});
