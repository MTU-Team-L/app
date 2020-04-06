import React from 'react';
import {test, expect} from 'jest-without-globals';
import {render} from 'react-native-testing-library';
import DecksAddScene from '../src/scenes/decks-add';
import navigationMock from '../__mocks__/navigation-mock';

test('DecksAdd view renders correctly', async () => {
  const {toJSON} = await render(<DecksAddScene navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});
