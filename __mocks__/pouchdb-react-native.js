import {jest} from 'jest-without-globals';
import seeds from './seed-data.json';

export const mockPouchDB = jest.fn();

const mock = mockPouchDB.mockImplementation(db => {
  return {
    allDocs: jest.fn().mockImplementation(() => Promise.resolve(seeds[db])),
    put: jest.fn().mockImplementation(() => Promise.resolve({}))
  };
});

export default mock;
