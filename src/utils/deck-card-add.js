import {Decks} from './db';

export default async (deck, card) => {
  const t = deck.cardList;
  t.push(card);
  const doc = {
    _id: deck._id,
    _rev: deck._rev,
    cardList: t

  };
  Decks.put(doc);

  return doc;
};
