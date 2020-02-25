import React from 'react';
import {test, jest, expect} from 'jest-without-globals';
import {render} from 'react-native-testing-library';
import CardsScene from '../src/scenes/cards';

const navigationMock = {
  setOptions: jest.fn(),
  navigate: jest.fn()
};

test('renders correctly', async () => {
  const {toJSON} = await render(<CardsScene navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});
