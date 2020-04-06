import React from 'react';
import {test, expect} from 'jest-without-globals';
import {render} from 'react-native-testing-library';
import DecksViewScene from '../src/scenes/deck-view';
import navigationMock from '../__mocks__/navigation-mock';

test('Decks view renders correctly', async () => {
  const {toJSON} = await render(<DecksViewScene navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});
