import {getGlobal, setGlobal} from 'reactn';
import {Decks} from './db';

export default async name => {
  console.log(name);
  const doc = await Decks.put({_id: name});
  // Update global state
  setGlobal({decks: [...getGlobal().decks, {_id: name}]});

  return doc;
};
