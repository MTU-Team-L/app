import * as Scry from 'scryfall-sdk';
import {getGlobal, setGlobal} from 'reactn';
import {Cards} from './db';

export default async name => {
  const res = await Scry.Cards.byName(name);
  const doc = await Cards.put({_id: res.name, ...res});

  // Update global state
  setGlobal({cards: [...getGlobal().cards, {_id: res.name, ...res}]});

  return doc;
};
