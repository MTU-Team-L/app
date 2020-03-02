import React from 'react';
import {test, expect} from 'jest-without-globals';
import {render} from 'react-native-testing-library';
import CardDetails from '../src/scenes/card-details';
import navigationMock from '../__mocks__/navigation-mock';
import {cards} from '../__mocks__/seed-data.json';

test('renders correctly', async () => {
  const testCard = cards.rows[0].doc;

  const {toJSON} = await render(<CardDetails navigation={navigationMock} route={{params: testCard}}/>);

  expect(toJSON()).toMatchSnapshot();
});
