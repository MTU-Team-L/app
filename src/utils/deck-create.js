import {getGlobal, setGlobal} from 'reactn';
import {Decks} from './db';

export default async name => {
  console.log(name);
  const doc = await Decks.put({_id: name, cardList: []});
  // Update global state
  setGlobal({decks: [...getGlobal().decks, {_id: name, cardList: []}]});

  return doc;
};
