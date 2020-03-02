import React from 'react';
import {test, expect} from 'jest-without-globals';
import {render} from 'react-native-testing-library';
import CardsScene from '../src/scenes/cards';
import navigationMock from '../__mocks__/navigation-mock';

test('renders correctly', async () => {
  const {toJSON} = await render(<CardsScene navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});
