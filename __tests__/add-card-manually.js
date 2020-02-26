import React from 'react';
import {test, expect} from 'jest-without-globals';
import {setGlobal, getGlobal} from 'reactn';
import {render, fireEvent} from 'react-native-testing-library';
import AddCardManually from '../src/scenes/add-card-manually';
import navigationMock from '../__mocks__/navigation-mock';

test('renders correctly', async () => {
  const {toJSON} = await render(<AddCardManually navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});

test('can add card', async () => {
  const {getByText, getByPlaceholder} = await render(<AddCardManually navigation={navigationMock}/>);

  // Init global
  setGlobal({
    cards: []
  });

  await fireEvent.changeText(getByPlaceholder('Card name'), 'Disperse');

  await fireEvent.press(getByText('Add'));

  expect(getGlobal().cards).toMatchSnapshot();
});
