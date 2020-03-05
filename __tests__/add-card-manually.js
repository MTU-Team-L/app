import React from 'react';
import {test, expect} from 'jest-without-globals';
import {render, fireEvent} from 'react-native-testing-library';
import AddCardManually from '../src/scenes/add-card-manually';
import {put} from '../__mocks__/pouchdb-react-native';
import navigationMock from '../__mocks__/navigation-mock';

test('renders correctly', async () => {
  const {toJSON} = await render(<AddCardManually navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});

test('can add card', async () => {
  const {getByText, getByPlaceholder} = await render(<AddCardManually navigation={navigationMock}/>);

  // Set up mock
  put.mockReturnValueOnce(Promise.resolve({id: 'Test-ID', ok: true, rev: '1-1ac49f882c114c68904c14c73095f484'}));

  await fireEvent.changeText(getByPlaceholder('Card name'), 'Disperse');

  await fireEvent.press(getByText('Add'));

  expect(put.mock.calls[0]).toMatchSnapshot();
});
