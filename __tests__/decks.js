import React from 'react';
import {test, expect} from 'jest-without-globals';
import {render} from 'react-native-testing-library';
import DecksScene from '../src/scenes/decks';
import navigationMock from '../__mocks__/navigation-mock';

test('Decks renders correctly', async () => {
  const {toJSON} = await render(<DecksScene navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});
