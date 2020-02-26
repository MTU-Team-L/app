import {jest} from 'jest-without-globals';

const mock = {
  SHORT: 'short',
  LONG: 'long',
  show: jest.fn()
};

module.exports = mock;
