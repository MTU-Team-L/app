import {jest} from 'jest-without-globals';
import seeds from './seed-data.json';

export const mockPouchDB = jest.fn();

const mock = mockPouchDB.mockImplementation(db => {
  return {
    allDocs: jest.fn().mockImplementation(() => Promise.resolve(seeds[db])),
    put: jest.fn().mockImplementation(() => Promise.resolve({id: 'Test-ID', ok: true, rev: '1-1ac49f882c114c68904c14c73095f484'}))
  };
});

export default mock;
