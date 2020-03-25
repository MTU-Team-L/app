import * as Scry from 'scryfall-sdk';
import {Cards} from './db';

export default async name => {
  const card = await Scry.Cards.byName(name);

  const doc = await Cards.put({_id: card.name, ...card});

  return doc;
};
