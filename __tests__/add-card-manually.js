import React from 'react';
import {test, expect} from 'jest-without-globals';
import {render, fireEvent} from 'react-native-testing-library';
import * as scryfall from '../__mocks__/scryfall-sdk';
import AddCardManually from '../src/scenes/add-card-manually';
import {put} from '../__mocks__/pouchdb-core-react-native';
import navigationMock from '../__mocks__/navigation-mock';

test('renders correctly', async () => {
  const {toJSON} = await render(<AddCardManually navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});

test('can add card', async () => {
  const {getByText, getByPlaceholder} = await render(<AddCardManually navigation={navigationMock}/>);

  // Set up mocks
  put.mockReturnValueOnce(Promise.resolve({id: 'Test-ID', ok: true, rev: '1-1ac49f882c114c68904c14c73095f484'}));

  scryfall.Cards.autoCompleteName.mockImplementation(search => {
    expect(search).toBe('Disperse');
    return Promise.resolve(['Disperse']);
  });

  await fireEvent.changeText(getByPlaceholder('Card name…'), 'Disperse');

  await fireEvent.press(getByText('Disperse'));

  expect(put.mock.calls[0]).toMatchSnapshot();
});
