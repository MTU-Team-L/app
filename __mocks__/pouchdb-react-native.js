import {jest} from 'jest-without-globals';
import seeds from './seed-data.json';

export const mockPouchDB = jest.fn();

export const put = jest.fn();

const mock = mockPouchDB.mockImplementation(db => {
  return {
    allDocs: jest.fn().mockImplementation(() => Promise.resolve(seeds[db])),
    put,
    changes: jest.fn().mockImplementation(() => ({on: jest.fn()}))
  };
});

export default mock;
