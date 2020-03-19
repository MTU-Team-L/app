import {jest} from 'jest-without-globals';
import {scryfallCard} from './seed-data.json';

const Cards = {
  byName: () => Promise.resolve(scryfallCard),
  search: jest.fn()
};

export {Cards};
