import {scryfallCard} from './seed-data.json';

module.exports = {
  Cards: {
    byName: () => Promise.resolve(scryfallCard)
  }
};
