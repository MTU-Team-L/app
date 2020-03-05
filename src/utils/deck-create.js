import {Decks} from './db';

export default async name => {
  const doc = await Decks.put({_id: name, cardList: []});

  return doc;
};
