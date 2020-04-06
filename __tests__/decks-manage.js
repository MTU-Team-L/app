import React from 'react';
import {test, expect} from 'jest-without-globals';
import {render} from 'react-native-testing-library';
import navigationMock from '../__mocks__/navigation-mock';
import DecksManageScene from '../src/scenes/deck-manage';
test('DeckManage renders correctly', async () => {
  const {toJSON} = await render(<DecksManageScene navigation={navigationMock}/>);

  expect(toJSON()).toMatchSnapshot();
});

