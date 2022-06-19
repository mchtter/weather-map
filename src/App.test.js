/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

beforeEach(() => {
  render(
      <Provider store={store}>
          <App />
      </Provider>
  );
});

test('render default value', () => {
  const element = screen.queryByTestId('selectedCity');
  expect(element.textContent).toEqual('Antalya');
});
